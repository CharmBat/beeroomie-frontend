import { Table, Image, Button } from 'antd';
import { useState } from 'react';

export default function Compare() {
    const [adsToCompare, setAdsToCompare] = useState([
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
    ]);

    // Handle Ad Removal
    const handleRemove = (adIndex) => {
        const updatedAds = [...adsToCompare];
        updatedAds.splice(adIndex, 1); // Remove the ad by index
        setAdsToCompare(updatedAds);
    };

    // Table Columns
    const columns = [
        {
            title: "Özellikler",
            dataIndex: "feature",
            key: "feature",
            width: "25%",
        },
        {
            title: (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {adsToCompare[0]?.title || "İlan 1"}
                    {adsToCompare[0] && (
                        <Button
                            type="primary"
                            danger
                            size="small"
                            onClick={() => handleRemove(0)}
                        >
                            Kaldır
                        </Button>
                    )}
                </div>
            ),
            dataIndex: "ad1",
            key: "ad1",
            render: (value) => value || <div style={{ textAlign: "center" }}>-</div>,
        },
        {
            title: (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {adsToCompare[1]?.title || "İlan 2"}
                    {adsToCompare[1] && (
                        <Button
                            type="primary"
                            danger
                            size="small"
                            onClick={() => handleRemove(1)}
                        >
                            Kaldır
                        </Button>
                    )}
                </div>
            ),
            dataIndex: "ad2",
            key: "ad2",
            render: (value) => value || <div style={{ textAlign: "center" }}>-</div>,
        },
    ];

    // Table Data
    const data = [
        {
            key: "1",
            feature: "Fotoğraflar",
            ad1: renderThumbnails(adsToCompare[0]?.images),
            ad2: renderThumbnails(adsToCompare[1]?.images),
        },
        {
            key: "2",
            feature: "Kullanıcı",
            ad1: adsToCompare[0]?.user,
            ad2: adsToCompare[1]?.user,
        },
        {
            key: "3",
            feature: "Konum",
            ad1: adsToCompare[0]?.location,
            ad2: adsToCompare[1]?.location,
        },
        {
            key: "4",
            feature: "Mesafe",
            ad1: adsToCompare[0]?.distance,
            ad2: adsToCompare[1]?.distance,
        },
        {
            key: "5",
            feature: "Evcil Hayvan",
            ad1: adsToCompare[0]?.pets ? "Evet" : "Hayır",
            ad2: adsToCompare[1]?.pets ? "Evet" : "Hayır",
        },
        {
            key: "6",
            feature: "Sigara",
            ad1: adsToCompare[0]?.smoking ? "Evet" : "Hayır",
            ad2: adsToCompare[1]?.smoking ? "Evet" : "Hayır",
        },
        {
            key: "7",
            feature: "Fiyat",
            ad1: `${adsToCompare[0]?.price} ₺`,
            ad2: `${adsToCompare[1]?.price} ₺`,
        },
    ];

    // Thumbnail Rendering Function
    function renderThumbnails(images) {
        if (!images || images.length === 0)
            return <div style={{ textAlign: "center" }}>Yok</div>;

        return (
            <div style={{ display: "flex", gap: "10px" }}>
                {images.slice(0, 4).map((url, idx) => (
                    <Image
                        key={idx}
                        width={60}
                        height={40}
                        src={url}
                        style={{
                            objectFit: "cover",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        preview={{
                            src: url,
                            mask: "",
                            toolbarRender: false,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                style={{ background: "#fff" }}
            />
        </div>
    );
}
