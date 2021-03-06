import { Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import MangaList from "./components/MangaList";
import Error404, { WhereYouGoin } from "./components/Error404";
import MangaDetail from "./components/MangaDetail";
import ChapterDetail from "./components/ChapterDetail";
import Home from "./components/Home";
import UploaderDetail from "./components/UploaderDetail";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import PurchasePoints from "./components/PurchasePoints";
import About from "./components/About";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";

const AppRoutes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/faq" component={FAQ} />

                <Route exact path="/profile" component={Profile} />
                <Route exact path="/update-profile" component={UpdateProfile} />
                <Route exact path="/purchase-points" component={PurchasePoints} />

                <Route exact path="/mangas" component={MangaList} />
                <Route exact path="/manga/:mangaId" component={MangaDetail} />
                <Route exact path="/manga/:mangaId/chapter/:chapterId" component={ChapterDetail} />

                <Route exact path="/uploader/:uploaderId" component={UploaderDetail} />

                <Route exact path="/where-you-goin" component={WhereYouGoin} />
                <Route component={Error404} />
            </Switch>
        </App>

    );
}

export default AppRoutes;