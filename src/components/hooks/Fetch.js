import axios from "axios";
import { useEffect, useState } from "react";

export default function Fetch({
    uri,
    config = {},
    renderLoading = <p>loading...</p>,
    renderError = <p>Fetch error</p>,
    renderSuccess = f => f
}) {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(uri, config)
            .then(({ data }) => setData(data))
            .then(() => setLoading(false)) // <== this go up and i'm goneeeeee
            .catch(setError);
    }, [uri, config]);

    return (
        (loading && renderLoading) ||
        (data && renderSuccess(data)) ||
        (error && renderError(error))
    );
};