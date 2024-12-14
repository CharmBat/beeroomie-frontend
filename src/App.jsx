import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

import AppHeader from "./components/Header";
import AppRoutes from "./AppRoutes";

const { Header, Content } = Layout;

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    return (
        <Layout>
            <Router>
                <Header>
                    <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </Header>
                <Content>
                    <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </Content>
            </Router>
        </Layout>
    );
}

export default App;
