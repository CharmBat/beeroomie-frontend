export default function NavUser() {
    // Example user avatar, use real data from backend if available
    const userAvatar = null; // Simulate no user image provided

    return (
        <div className="d-flex align-items-center gap-3">
            <button className="btn btn-primary btn-sm">+ Yeni İlan</button>
            <div className="d-flex align-items-center gap-2">
                <img
                    src={userAvatar || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                    alt="User Avatar"
                    className="rounded-circle border border-primary"
                    style={{ width: "40px", height: "40px" }}
                />
                <span className="text-dark fw-medium">Never_Sa</span>
            </div>
        </div>
    );
}
