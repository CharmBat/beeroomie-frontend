import { useState } from "react";

export function useCompare() {
    const [compareAds, setCompareAds] = useState(() => {
        return JSON.parse(localStorage.getItem("compareAds")) || [];
    });

    const handleCompareChange = (adId) => {
        setCompareAds((prevCompareAds) => {
            let updatedAds;
            if (prevCompareAds.includes(adId)) {
                updatedAds = prevCompareAds.filter((id) => id !== adId);
            } else {
                if (prevCompareAds.length >= 2) {
                    updatedAds = [prevCompareAds[1], adId];
                } else {
                    updatedAds = [...prevCompareAds, adId];
                }
            }
            localStorage.setItem("compareAds", JSON.stringify(updatedAds));
            return updatedAds;
        });
    };

    return { compareAds, handleCompareChange };
}