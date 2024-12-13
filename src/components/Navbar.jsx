import { useState } from "react";

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-controls="navbarNav"
                aria-expanded={isExpanded}
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#ilanlar">
                            İlanlar
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#karsilastir">
                            Karşılaştır
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#teklifler">
                            Teklifler
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#favoriler">
                            Favoriler
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
