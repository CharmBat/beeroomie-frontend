import {Table, Image, Button, Empty, Spin} from 'antd';
import {useEffect, useState} from 'react';
import {getAdById} from "../Advertisement/AdApi";

export default function Compare() {
    const [adsToCompare, setAdsToCompare] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAdIds = JSON.parse(localStorage.getItem('compareAds')) || [];
        const fetchAds = async () => {
            setLoading(true);
            try {
                if (storedAdIds.length === 2) {
                    const [response1, response2] = await Promise.all([
                        getAdById(storedAdIds[0]),
                        getAdById(storedAdIds[1]),
                    ]);
                    setAdsToCompare([response1.advertisement_list[0], response2.advertisement_list[0]]);
                } else if (storedAdIds.length === 1) {
                    const response = await getAdById(storedAdIds[0]);
                    setAdsToCompare([response.advertisement_list[0]]);
                } else {
                    setAdsToCompare([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    const handleRemove = (adIndex) => {
        const updatedAds = [...adsToCompare];
        updatedAds.splice(adIndex, 1);
        setAdsToCompare(updatedAds);

        const storedAdIds = JSON.parse(localStorage.getItem('compareAds')) || [];
        const updatedAdIds = storedAdIds.filter((_, index) => index !== adIndex);
        localStorage.setItem('compareAds', JSON.stringify(updatedAdIds));
    };

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
                <Spin size="large"/>
            </div>
        );
    }

    if (adsToCompare.length === 0) {
        return (
            <Empty style={{marginTop: "40px"}}
                   image= {process.env.PUBLIC_URL + "/logo192.png"}
                   imageStyle={{height: 60}}
                   description={
                       <span>
                        Karşılaştırılacak 2 ilan seçmek için <b>İlanlar</b> sayfasına gidin.
                    </span>
                   }
            />
        );
    }

    if (adsToCompare.length === 1) {
        return (
            <div style={{padding: "20px"}}>
                <Table
                    columns={[
                        {
                            title: "Özellikler",
                            dataIndex: "feature",
                            key: "feature",
                            width: "25%",
                        },
                        {
                            title: (
                                <div style={{alignItems: "center"}}>
                                    {adsToCompare[0]?.title}
                                    {adsToCompare[0] && (
                                        <Button
                                            type="primary"
                                            danger
                                            size="small"
                                            style={{marginLeft: "10px"}}
                                            onClick={() => handleRemove(0)}
                                        >
                                            Kaldır
                                        </Button>
                                    )}
                                </div>
                            ),
                            dataIndex: "ad1",
                            key: "ad1",
                            width: "75%",
                            render: (value) => value || <div style={{textAlign: "center"}}>-</div>,
                        },
                    ]}
                    dataSource={[
                        {
                            key: "1",
                            feature: "Fotoğraflar",
                            ad1: renderThumbnails(adsToCompare[0]?.photos),
                        },
                        {
                            key: "2",
                            feature: "İlan Sahibi",
                            ad1: adsToCompare[0]?.user_full_name,
                        },
                        {
                            key: "3",
                            feature: "Konum",
                            ad1:
                                adsToCompare[0]?.address +
                                ", " +
                                adsToCompare[0]?.district +
                                " / " +
                                adsToCompare[0]?.neighborhood,
                        },
                        {
                            key: "4",
                            feature: "Fiyat",
                            ad1: `${adsToCompare[0]?.price} ₺`,
                        },
                        {
                            key: "5",
                            feature: "Cinsiyet Tercihi",
                            ad1: adsToCompare[0]?.gender_choices,
                        },
                        {
                            key: "6",
                            feature: "Oda Sayısı",
                            ad1: adsToCompare[0]?.n_room,
                        },
                        {
                            key: "7",
                            feature: "Kat",
                            ad1: adsToCompare[0]?.n_floor,
                        },
                        {
                            key: "8",
                            feature: "Metrekare",
                            ad1: `${adsToCompare[0]?.m2} m²`,
                        },
                        {
                            key: "9",
                            feature: "Eşyalı",
                            ad1: adsToCompare[0]?.furnished ? "Evet" : "Hayır",
                        },
                        {
                            key: "10",
                            feature: "Evcil Hayvan",
                            ad1: adsToCompare[0]?.pet ? "Evet" : "Hayır",
                        },
                        {
                            key: "11",
                            feature: "Sigara Kullanımı",
                            ad1: adsToCompare[0]?.smoking ? "Evet" : "Hayır",
                        },
                        {
                            key: "12",
                            feature: "İmkanlar",
                            ad1: adsToCompare[0]?.utilities?.join(", ") || "Yok",
                        },
                    ]}
                    pagination={false}
                    bordered
                    style={{background: "#fff"}}
                />
            </div>
        );
    }

    function renderThumbnails(images) {
        if (!images || images.length === 0)
            return <div style={{textAlign: "center"}}>Yok</div>;

        return (
            <div style={{display: "flex", gap: "10px"}}>
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
                <div style={{alignItems: "center"}}>
                    {adsToCompare[0]?.title}
                    {adsToCompare[0] && (
                        <Button
                            type="primary"
                            danger
                            size="small"
                            style={{marginLeft: "10px"}}
                            onClick={() => handleRemove(0)}
                        >
                            Kaldır
                        </Button>
                    )}
                </div>
            ),
            dataIndex: "ad1",
            key: "ad1",
            width: "37.5%",
        },
        {
            title: (
                <div style={{alignItems: "center"}}>
                    {adsToCompare[1]?.title || "İlan 2"}
                    {adsToCompare[1] && (
                        <Button
                            type="primary"
                            danger
                            size="small"
                            style={{marginLeft: "10px"}}
                            onClick={() => handleRemove(1)}
                        >
                            Kaldır
                        </Button>
                    )}
                </div>
            ),
            dataIndex: "ad2",
            key: "ad2",
            width: "37.5%",
        },
    ];

    const data = [
        {
            key: "1",
            feature: "Fotoğraflar",
            ad1: renderThumbnails(adsToCompare[0]?.photos),
            ad2: renderThumbnails(adsToCompare[1]?.photos),
        },
        {
            key: "2",
            feature: "İlan Sahibi",
            ad1: adsToCompare[0]?.user_full_name,
            ad2: adsToCompare[1]?.user_full_name,
        },
        {
            key: "3",
            feature: "Konum",
            ad1: adsToCompare[0]?.address + ", " + adsToCompare[0]?.district + " / " + adsToCompare[0]?.neighborhood,
            ad2: adsToCompare[1]?.address,
        },
        {
            key: "4",
            feature: "Fiyat",
            ad1: `${adsToCompare[0]?.price} ₺`,
            ad2: `${adsToCompare[1]?.price} ₺`,
        },
        {
            key: "5",
            feature: "Cinsiyet Tercihi",
            ad1: adsToCompare[0]?.gender_choices,
            ad2: adsToCompare[1]?.gender_choices,
        },
        {
            key: "6",
            feature: "Oda Sayısı",
            ad1: adsToCompare[0]?.n_room,
            ad2: adsToCompare[1]?.n_room,
        },
        {
            key: "7",
            feature: "Kat",
            ad1: adsToCompare[0]?.n_floor,
            ad2: adsToCompare[1]?.n_floor,
        },
        {
            key: "8",
            feature: "Metrekare",
            ad1: `${adsToCompare[0]?.m2} m²`,
            ad2: `${adsToCompare[0]?.m2} m²`,
        },
        {
            key: "9",
            feature: "Eşyalı",
            ad1: adsToCompare[0]?.furnished ? "Evet" : "Hayır",
            ad2: adsToCompare[1]?.furnished ? "Evet" : "Hayır",
        },
        {
            key: "10",
            feature: "Evcil Hayvan",
            ad1: adsToCompare[0]?.pet ? "Evet" : "Hayır",
            ad2: adsToCompare[1]?.pet ? "Evet" : "Hayır",
        },
        {
            key: "11",
            feature: "Sigara Kullanımı",
            ad1: adsToCompare[0]?.smoking ? "Evet" : "Hayır",
            ad2: adsToCompare[1]?.smoking ? "Evet" : "Hayır",
        },
        {
            key: "12",
            feature: "İmkanlar",
            ad1: adsToCompare[0]?.utilities?.join(", ") || "Yok",
            ad2: adsToCompare[1]?.utilities?.join(", ") || "Yok",
        },


    ];

    return (
        <div style={{padding: "20px"}}>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                style={{background: "#fff"}}
            />
        </div>
    );
}
