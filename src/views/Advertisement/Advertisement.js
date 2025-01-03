import { Row, Col, message } from 'antd';
import AdCard from '../../components/AdCard';
import Filter from '../../components/Filter';
import { useEffect, useState } from 'react';
import { filterAdvertisements, getAllAdvertisements } from './AdApi';
import { Pagination } from 'antd';
import {useCompare} from "../../hooks/useCompare";
import {useFavorites} from "../../hooks/useFavorites";

export default function Advertisement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [ads, setAds] = useState([]);
    const { compareAds, handleCompareChange } = useCompare();
    const { favorites, handleFavoriteChange } = useFavorites();

    useEffect(() => {
        const fetchAds = async () => {
            try{
                const response = await getAllAdvertisements(currentPage);
                if(response.error_status === 200){
                    setAds(response.advertisement_list);
                }
                else{
                    message.error(response.system_message);
                }
            } catch (error) {
                message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
            }
        };
        fetchAds();
    }, [currentPage]);

    const handleFilter = async (filterValues) => {
        try{
            const response = await filterAdvertisements(filterValues, 1);
            if(response.error_status === 200){
                setAds(response.advertisement_list);
                setCurrentPage(1);
            }
            else{
                message.error(response.system_message);
            }
        } catch (error) {
            message.error('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ padding: "20px" }}>
    <Row gutter={16} justify="space-evenly">
        {/* Filter */}
        <Col xs={24} sm={24} md={8} lg={6}>
            <Filter onFilterSubmit={handleFilter} />
        </Col>
        {/*xs sm md lg xl*/}
        {/* Advertisement */}
        <Col xs={24} sm={24} md={16} lg={18}>
            <Row gutter={[16, 16]}>
                {ads && ads.map(ad => (
                    <Col key={ad.adpageid} sm={24} md={12} lg={8}>
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
            <Pagination
                current={currentPage}
                onChange={handlePageChange}
            />
        </Col>
    </Row>
</div>

    );
}
