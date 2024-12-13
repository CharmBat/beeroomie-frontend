import {Dropdown, Space} from 'antd';
import {Link} from "react-router-dom";

const items = [
    {
        key: '1',
        label: (
            <Link to="/Profile" className={"text-decoration-none"}>Profilim</Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/" className={"text-decoration-none"}>Çıkış Yap</Link>
        ),
        // icon: <SmileOutlined />,
    }
];

export default function UserText() {


    return (
        <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
                <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}}>
                    <img
                        alt="User Avatar"
                        src={process.env.PUBLIC_URL + "/blankAvatar.svg"}
                        style={{width: "40px", height: "40px"}}
                    />
                    <div>UserName</div>
                </div>
            </a>
        </Dropdown>
    );
}
