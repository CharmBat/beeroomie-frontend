import LogoText from "./LogoText";
import Navbar from "./Navbar";
import NavUser from "./NavUser";

export default function Header() {
    return (
        <header className="container-fluid">
            <div className="row align-items-center py-2">
                {/* Logo Section */}
                <div className="col-auto">
                    <LogoText />
                </div>

                {/* Navbar Section */}
                <div className="col">
                    <Navbar />
                </div>

                {/* User Section */}
                <div className="col-auto">
                    <NavUser />
                </div>
            </div>
        </header>
    );
}
