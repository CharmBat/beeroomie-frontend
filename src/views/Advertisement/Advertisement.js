import { Row, Col } from 'antd';
import AdCard from '../../components/AdCard';
import Filter from '../../components/Filter';

const ads = [
    {
        id: 1,
        title: "Kağıthanede Oda",
        user: "John Doe",
        location: "Kağıthane",
        distance: "Sanayi Mahallesi 200m",
        pets: true,
        smoking: true,
        price: 15000,
        images: [
            "https://via.placeholder.com/300x200",
            "https://via.placeholder.com/300x200/ff0000",
            "https://via.placeholder.com/300x200/00ff00",
            "https://via.placeholder.com/300x200/0000ff",
        ],
    },
    {
        id: 2,
        title: "Beşiktaşta Lüks Oda",
        user: "Jane Doe",
        location: "Beşiktaş",
        distance: "Levent Mahallesi 500m",
        pets: false,
        smoking: false,
        price: 20000,
        images: [
            "https://via.placeholder.com/300x200",
            "https://via.placeholder.com/300x200/000000",
            "https://via.placeholder.com/300x200/ffcc00",
            "https://via.placeholder.com/300x200/00ccff",
        ],
    },
    {
        id: 3,
        title: "Etilerde Geniş Daire",
        user: "Alice Smith",
        location: "Etiler",
        distance: "Nispetiye Mahallesi 300m",
        pets: true,
        smoking: false,
        price: 25000,
        images: [
            "https://via.placeholder.com/300x200/ff99cc",
            "https://via.placeholder.com/300x200/660066",
            "https://via.placeholder.com/300x200/ccff99",
            "https://via.placeholder.com/300x200/3366cc",
        ],
    },
    {
        id: 4,
        title: "Taksimde Merkezi Oda",
        user: "Bob Brown",
        location: "Taksim",
        distance: "Cumhuriyet Mahallesi 100m",
        pets: false,
        smoking: true,
        price: 18000,
        images: [
            "https://via.placeholder.com/300x200/ffcccc",
            "https://via.placeholder.com/300x200/ccffcc",
            "https://via.placeholder.com/300x200/ccccff",
            "https://via.placeholder.com/300x200/ffcc99",
        ],
    },
    {
        id: 5,
        title: "Kadıköyde Ferah Daire",
        user: "Chris Johnson",
        location: "Kadıköy",
        distance: "Moda Mahallesi 600m",
        pets: true,
        smoking: false,
        price: 22000,
        images: [
            "https://via.placeholder.com/300x200/6699ff",
            "https://via.placeholder.com/300x200/ff99ff",
            "https://via.placeholder.com/300x200/ffff66",
            "https://via.placeholder.com/300x200/66ff99",
        ],
    },
    {
        id: 6,
        title: "Üsküdarda Sessiz ve Sakin Oda",
        user: "Emily Clark",
        location: "Üsküdar",
        distance: "Çengelköy Mahallesi 700m",
        pets: false,
        smoking: false,
        price: 17000,
        images: [
            "https://via.placeholder.com/300x200/6633ff",
            "https://via.placeholder.com/300x200/ff3366",
            "https://via.placeholder.com/300x200/33cc99",
            "https://via.placeholder.com/300x200/ff9933",
        ],
    },
];
export default function Advertisement() {
    const handleFilter = (filterValues) => {
        console.log("Applied Filters: ", filterValues); // Handle filtering logic
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
                        {ads.map(ad => (
                            <Col key={ad.id} sm={24} md={12} lg={8}>
                                <AdCard {...ad} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
