import { useState, useEffect } from 'react';
import {Menu, Button, Flex, message} from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoText from "./LogoText";
import UserText from "./UserText";
import {sendLogoutRequest} from "../views/Auth/AuthApi";


export default function AppHeader({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("");
    const role = localStorage.getItem("userRole");

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await sendLogoutRequest(token); // Make API call to logout
            localStorage.removeItem('authToken'); // Remove token from storage
            setIsLoggedIn(false); // Update the state to reflect logout
            message.success("Yine Bekleriz");
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            message.error("Çıkış Yapılamadı");
        }
    };


    useEffect(() => {
        const pathToKeyMap = {
            "/": "1",
            "/compare": "2",
            "/offer": "3",
            "/favorite": "4",
        };
        setSelectedKey(pathToKeyMap[location.pathname] || "");
    }, [location.pathname]);

    if (!isLoggedIn) {
        return (
            <Flex justify={"start"} align={"center"} gap={"20px"}>
                <LogoText />
            </Flex>
        );
    }

    if (role === "NewUser" || role === null) {
        return (
            <Flex justify={"space-between"} align={"center"}>
                <Flex justify={"flex-start"} align={"center"} gap={"20px"}>
                    <LogoText/>
                </Flex>
                <Flex justify={"flex-end"} align={"center"} gap={"15px"}>
                    <Button type="primary" onClick={handleLogout}>Çıkış Yap</Button>
                </Flex>
            </Flex>
        );
    }

    return (
        <>
            <Flex justify={"space-between"} align={"center"}>
                <Flex justify={"flex-start"} align={"center"} gap={"20px"}>
                    <LogoText/>
                    <Menu mode="horizontal" selectedKeys={[selectedKey]} defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to="/">İlanlar</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/compare">Karşılaştır</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/offer">Teklifler</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/favorite">Favoriler</Link></Menu.Item>
                    </Menu>
                </Flex>
                <Flex justify={"flex-end"} align={"center"} gap={"15px"}>
                    {role === "Admin" && <Button type="primary" style={{ background: "mediumpurple" }}><Link to={"/adminPanel"}>Admin Panel</Link></Button>}
                    {role === "Roomie" && <Button type="primary"><Link to={"/publishAd"}>İlan Ver</Link></Button>}
                    {/*TODO: Change the link to my ad detail with id for housie*/}
                    {role === "Housie" && <Button type="primary"><Link to={"/publishAd"}>İlanın</Link></Button>}
                    <UserText setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
                </Flex>
            </Flex>
        </>
    );
}
