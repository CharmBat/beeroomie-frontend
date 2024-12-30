import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

export default function UserText({ handleLogout}) {
    const userId = localStorage.getItem('userId');

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

    return (
        <Dropdown menu={{ items }}>
                <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                    <img
                        alt="User Avatar"
                        src={process.env.PUBLIC_URL + "/blankAvatar.svg"}
                        style={{ width: "40px", height: "40px" }}
                    />
                    <div>UserName</div>
                </div>
        </Dropdown>
    );
}
