import {Avatar, Button, Dropdown} from 'antd';
import { Link } from 'react-router-dom';
import React from "react";

export default function UserText({ handleLogout, isMobile}) {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userPic = localStorage.getItem('userPic');

    const items = [
        {
            key: '1',
            label: (
                <Link to={`/profile/${userId}`} className="text-decoration-none">
                    Profilim
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={handleLogout} className="text-decoration-none" style={{ cursor: "pointer" }}>
                    Çıkış Yap
                </span>
            ),
        },
    ];

    if (isMobile) {
        return (
            <>
                <Button type="primary" onClick={handleLogout} className="mt-4" block>
                    Çıkış Yap
                </Button>
                <Link to={`/profile/${userId}`} className="d-flex align-items-center gap-2 mt-4 justify-content-center border rounded p-2"
                      style={{cursor: "pointer"}}>
                    <Avatar
                        size={120}
                        src={userPic || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                        style={{
                            width: '60px',
                            height: '60px',
                            border: '2px solid #1890ff',
                        }}
                    />
                    <div style={{color:"black", fontWeight:"600", fontSize:"14" }}>{userName}</div>
                </Link>
            </>
        );
    }

    return (
        <Dropdown menu={{items}}>
            <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}}>
                <Avatar
                    size={120}
                    src={userPic || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                    style={{
                        width: '50px',
                        height: '50px',
                        border: '2px solid #1890ff',
                    }}
                />
                    <div style={{fontWeight:"600", fontSize:"14"}}>{userName}</div>
                </div>
        </Dropdown>
    );
}
