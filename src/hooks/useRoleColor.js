export function useRoleColor() {
    const userRole = localStorage.getItem("userRole");

    const roleColors = {
        Roomie: "#1677ff",
        Housie: "orange",
        Admin: "mediumpurple",
    };

    return roleColors[userRole] || "gray";
}