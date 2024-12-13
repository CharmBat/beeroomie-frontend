import { useState, useEffect } from 'react';
import {Menu, Button, Flex} from 'antd';
import { Link, useLocation } from "react-router-dom";
import LogoText from "./LogoText";
import UserText from "./UserText";


export default function AppHeader() {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("");

    useEffect(() => {
        const pathToKeyMap = {
            "/": "1",
            "/compare": "2",
            "/offer": "3",
            "/favourite": "4",
        };
        setSelectedKey(pathToKeyMap[location.pathname] || "");
    }, [location.pathname]);

    return (
        <>
            <Flex justify={"space-between"} align={"center"}>
                <Flex justify={"flex-start"} align={"center"} gap={"20px"}>
                    <LogoText/>
                    <Menu mode="horizontal" selectedKeys={[selectedKey]} defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to="/">İlanlar</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/compare">Karşılaştır</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/offer">Teklifler</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/favourite">Favoriler</Link></Menu.Item>
                    </Menu>
                </Flex>
                <Flex justify={"flex-end"} align={"center"} gap={"15px"}>
                    <Button type="primary"><Link to={"/publishAd"}>İlan Ver</Link></Button>
                    <UserText/>
                </Flex>
            </Flex>
        </>
    );
}
