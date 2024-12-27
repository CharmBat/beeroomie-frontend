import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

import AppHeader from "./components/Header";
import AppRoutes from "./AppRoutes";

const { Header, Content } = Layout;

function App() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const userId = "1"; //bağlanıcak
    const userRole = "Admin"; //bağlanıcak

    return (
        <Layout>
            <Router>
                <Header>
                    <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} userRole={userRole} />
                </Header>
                <Content>
                    <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole} />
                </Content>
            </Router>
        </Layout>
    );
}

export default App;
