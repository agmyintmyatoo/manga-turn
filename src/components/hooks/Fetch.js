import axios from "axios";
import { useEffect, useState } from "react";
import { useDataContext } from "./data-context";
import { ImSpinner9 } from "react-icons/im";

import { baseUrl, apiUrl, refreshToken } from "../../api-endpoints";


export const mtaxios = axios.create({
    baseURL: `${baseUrl}${apiUrl}`,
    // onUploadProgress: e => { console.log('onUploadProgress', e) },
    // onDownloadProgress: e => { console.log('onDownloadProgress', e) },
});


export default function Fetch({
    uri,
    renderLoading = <ImSpinner9 className="animate-spin" />,
    renderError = e => {
        console.log(e);
        return (
            <>
                <p style={{ color: 'red' }}>{e.message}</p>
                <p>If you can't do anything, please <a className="underline" href="https://m.me/remindmetostudy">contact dev</a>.</p>
            </>
        );
    },
    renderSuccess,
    useCache = false,
    giftFromParent = {}, // Pass obj from parent to child
}) {
    const { token, setToken, rtoken, cache, setCache } = useDataContext();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    // to force refetch
    const [forceRefetch, setForceRefetch] = useState();


    // interceptor to check if token is valid
    mtaxios.interceptors.response.use(
        response => {
            // intercept response here
            return response;
        },
        error => {
            // refresh token if expired
            if (error.response.data.message === "Invalid JWT.") {
                console.log("Token need to be refreshed.");
                handleRefresh();
            }
            return Promise.reject(error);
        });

    const handleRefresh = async () => {
        const { accessToken } = await fetch(`${baseUrl}${apiUrl}${refreshToken}${rtoken}`).then(r => r.json());
        await setToken(accessToken);
    }

    // use custom axios instance - mtaxios
    // set token in header as default
    mtaxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        if (cache && cache[uri]) {
            setLoading(false);
            setData(cache[uri]);
        }
        else {
            mtaxios.get(uri)
                .then(({ data }) => {
                    if (useCache) setCache(uri, data);
                    setData(data)
                })
                .then(() => setLoading(false)) // <== this go up and i'm goneeeeee
                .catch(e => {
                    // I don't know specifically but
                    // this line give axios' interceptor some time
                    // to refresh the token, lmao
                    if (e.response && e.response.data.message === "Invalid JWT.") return null;
                    else {
                        setError(e);
                        console.log(e.response);
                        setLoading(false);
                    }
                });
        }
        // component unmount
        return () => console.log("component unmount");

    }, [cache, setCache, token, uri, forceRefetch]);

    if (loading) return renderLoading;
    if (error) return renderError(error)
    if (data) return renderSuccess(data, token, setForceRefetch, giftFromParent);

};
