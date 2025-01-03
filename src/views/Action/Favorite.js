import {Row, Col, Empty, message, Spin} from 'antd';
import AdCard from '../../components/AdCard';
import {useEffect, useState} from 'react';
import { getFavorites } from "../MiscApi";
import {useCompare} from "../../hooks/useCompare";
import {useFavorites} from "../../hooks/useFavorites";

export default function Favorite() {
    const [ favoriteData, setFavoriteData ] = useState([]);
    const { favorites, handleFavoriteChange } = useFavorites();
    const { compareAds, handleCompareChange } = useCompare();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const response = await getFavorites();
                setFavoriteData(response || []);
            } catch (error) {
                console.error("Hata:", error);
                message.error("Favoriler alınırken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
                <Spin size="large"/>
            </div>
        );
    }

    return (
        <div style={{padding: "20px"}}>
            {favoriteData.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {favoriteData.map((ad) => (
                        <Col key={ad.id} xs={24} sm={12} md={8} lg={6}>
                            <AdCard
                                id={ad.adpageid}
                                title={ad.title}
                                location={ad.address}
                                pets={ad.pet}
                                smoking={ad.smoking}
                                price={ad.price}
                                images={ad.photos}
                                isCompared={compareAds.includes(ad.adpageid)}
                                onCompareChange={handleCompareChange}
                                isFavorited={favorites.includes(ad.adpageid)}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty style={{marginTop: "20px"}}
                       image= {process.env.PUBLIC_URL + "/logo192.png"}
                       imageStyle={{height: 60}}
                       description={
                           <span>
                        Henüz bir favorin yok. <b>İlanlar</b> sayfasından favori ilanlarını seçebilirsin.
                    </span>
                       }
                />
            )}
        </div>
    );
}
