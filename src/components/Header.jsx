import {useState, useEffect} from 'react';
import {Menu, Button, Flex, message, Drawer} from 'antd';
import {MenuOutlined} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from "react-router-dom";
import LogoText from "./LogoText";
import UserText from "./UserText";
import {sendLogoutRequest} from "../views/Auth/AuthApi";


export default function AppHeader({isLoggedIn, setIsLoggedIn}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const role = localStorage.getItem("userRole");
    const [drawerVisible, setDrawerVisible] = useState(false);

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
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, [location.pathname]);


    if (!isLoggedIn) {
        return (
            <Flex justify={"start"} align={"center"} gap={"20px"}>
                <LogoText/>
            </Flex>
        );
    }

    const renderButtons = (isMobile = false) => (
        <>
            {role === "Admin" &&
                <Button type="primary" style={{
                    background: "mediumpurple",
                    width: isMobile ? "100%" : "auto",
                    marginTop: isMobile ? "24px" : "0"
                }}><Link to={"/adminPanel"}>Admin Panel</Link></Button>}
            {role === "Roomie" && <Button type="primary" style={{
                width: isMobile ? "100%" : "auto",
                marginTop: isMobile ? "24px" : "0"
            }}><Link to={"/publishAd"}>İlan Ver</Link></Button>}
            {role === "Housie" && <Button type="primary" style={{
                background: "orange",
                width: isMobile ? "100%" : "auto",
                marginTop: isMobile ? "24px" : "0"
            }}><Link to={"/publishAd"}>İlanın</Link></Button>}
            <UserText isMobile={isMobile} handleLogout={handleLogout}/>
        </>
    );

    const renderMenu = (isMobile = false) => (
        <Menu mode={isMobile ? "vertical" : "horizontal"} style={{textAlign: "center"}} selectedKeys={[selectedKey]}
              defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/">İlanlar</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/compare">Karşılaştır</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/offer">Teklifler</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/favorite">Favoriler</Link></Menu.Item>
        </Menu>
    );

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

    if (isMobile) {
        return (
            <Flex justify={"space-between"} align={"center"}>
                <Flex justify={"flex-start"} align={"center"} gap={"20px"}>
                    <LogoText/>
                </Flex>
                <Flex justify={"flex-end"} align={"center"} gap={"15px"}>
                    <Button type="text" icon={<MenuOutlined style={{fontSize: "24px", color: "blue"}}/>}
                            onClick={() => setDrawerVisible(true)}/>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={() => setDrawerVisible(false)}
                        open={drawerVisible}
                    >
                        {renderMenu(true)}
                        {renderButtons(true)}
                    </Drawer>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex justify={"space-between"} align={"center"}>
            <Flex justify={"flex-start"} align={"center"} gap={"20px"}>
                <LogoText/>
                {renderMenu(false)}
            </Flex>
            <Flex justify={"flex-end"} align={"center"} gap={"15px"}>
                {renderButtons(false)}
            </Flex>
        </Flex>
    );
}
