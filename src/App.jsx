import { Layout } from 'antd';
import { Route, Routes, BrowserRouter as Router} from "react-router-dom";

import AppHeader from './components/Header';
import Advertisement from "./views/Advertisement";
import Compare from "./views/Compare";
import Favourite from "./views/Favourite";
import Offer from "./views/Offer";
import PublishAdvertisement from "./views/PublishAdvertisement";
import Profile from "./views/Profile";
import Logout from "./views/Logout";
import PageNotFound from "./views/PageNotFound";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
        <Router>
            <Header>
                <AppHeader/>
            </Header>
            <Content>
                <Routes>
                    <Route path="/" element={<Advertisement/>}/>
                    <Route path="/compare" element={<Compare/>}/>
                    <Route path="/favourite" element={<Favourite/>}/>
                    <Route path="/offer" element={<Offer/>}/>
                    <Route path="/publishAd" element={<PublishAdvertisement/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Content>
        </Router>
    </Layout>
  );
}

export default App;