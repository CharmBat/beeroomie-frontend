import { Row, Col, message } from 'antd';
import AdCard from '../../components/AdCard';
import Filter from '../../components/Filter';
import { useEffect, useState } from 'react';
import { filterAdvertisements, getAllAdvertisements } from './AdApi';
import { Pagination } from 'antd';

export default function Advertisement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [ads, setAds] = useState([]);
    const [compareAds, setCompareAds] = useState(() => {
        return JSON.parse(localStorage.getItem('compareAds')) || [];
    });
    const distance = 0;

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

    const handleCompareChange = (adId) => {
        setCompareAds((prevCompareAds) => {
            let updatedAds;
            if (prevCompareAds.includes(adId)) {
                updatedAds = prevCompareAds.filter(id => id !== adId);
            } else {
                if (prevCompareAds.length >= 2) {
                    updatedAds = [prevCompareAds[1], adId];
                } else {
                    updatedAds = [...prevCompareAds, adId];
                }
            }
            localStorage.setItem('compareAds', JSON.stringify(updatedAds));
            console.log("Updated compareAds:", updatedAds);
            return updatedAds;
        });
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
                            distance={distance}
                            pets={ad.pet}
                            smoking={ad.smoking}
                            price={ad.price}
                            images={ad.photos}
                            isCompared={compareAds.includes(ad.adpageid)}
                            onCompareChange={handleCompareChange}
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
