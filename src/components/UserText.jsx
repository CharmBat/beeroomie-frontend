import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function UserText({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);  // Simulate logout
        navigate('/login');
    };

    const items = [
        {
            key: '1',
            label: (
                <Link to="/Profile" className="text-decoration-none">Profilim</Link>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={handleLogout} className="text-decoration-none" style={{ cursor: "pointer" }}>
                    Çıkış Yap
                </span>
            ),
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <a href="/Profile" onClick={(e) => e.preventDefault()} className="text-decoration-none text-black">
                <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
                    <img
                        alt="User Avatar"
                        src={process.env.PUBLIC_URL + "/blankAvatar.svg"}
                        style={{ width: "40px", height: "40px" }}
                    />
                    <div>UserName</div>
                </div>
            </a>
        </Dropdown>
    );
}
