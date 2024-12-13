import {Link} from "react-router-dom";

export default function LogoText() {
    return (
        <Link to="/" className="fw-normal d-flex align-items-center gap-2">
            <img
                src={process.env.PUBLIC_URL + "/logo192.png"}
                alt="BeeRoomie Logo"
                style={{ width: "40px", height: "40px" }}
            />
            <b className="fs-4 text-dark">BeeRoomie</b>
        </Link>
    );
}