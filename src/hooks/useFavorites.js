import { useState, useEffect } from "react";
import { addFavorite, getFavoriteIds, removeFavorite } from "../views/MiscApi";
import { message } from "antd";

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await getFavoriteIds();
                setFavorites(response);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                message.error("Favoriler alınamadı.");
            }
        };

        fetchFavorites();
    }, []);

    const handleFavoriteChange = async (adId) => {
        try {
            if (favorites.includes(adId)) {
                await removeFavorite(adId);
                setFavorites((prev) => prev.filter((id) => id !== adId));
                message.success("Favorilerden başarıyla kaldırıldı.");
            } else {
                await addFavorite(adId);
                setFavorites((prev) => [...prev, adId]);
                message.success("Favorilere başarıyla eklendi.");
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
            message.error("Favori güncellemesi sırasında bir hata oluştu.");
        }
    };

    return { favorites, handleFavoriteChange };
}
