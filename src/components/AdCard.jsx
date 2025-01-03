import { Card, Row, Col, Tag, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EnvironmentOutlined, UserOutlined, StarOutlined, StarFilled, SwapOutlined } from '@ant-design/icons';
import {useState} from 'react';

export default function AdCard({id, title, user, location, pets, smoking, price, images, isCompared, onCompareChange, isFavorited, onFavoriteChange}) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleCompareChange = () => {
        onCompareChange(id);
    }

    const handleFavoriteChange = () => {
        onFavoriteChange(id);
    }

    return (
        <Card
            hoverable
            style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                position: "relative",
            }}
        >
            {/* Image Gallery */}
            <div style={{ marginBottom: "15px", position: "relative" }}>
                {/* Main Image */}
                <img
                    alt={title}
                    src={selectedImage}
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "5px",
                    }}
                />
                {/* Action Buttons */}
                <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>
                    {/* Favorite Button */}
                    <Tooltip title={isFavorited ? "Favorilerden Kaldır" : "Favorilere Ekle"}>
                        <Button
                            shape="circle"
                            icon={isFavorited ? <StarFilled style={{ color: "#fadb14" }} /> : <StarOutlined />}
                            onClick={handleFavoriteChange}
                            style={{
                                backgroundColor: isFavorited ? "#fff" : "rgba(255, 255, 255, 0.9)",
                                borderColor: isFavorited ? "#fadb14" : "#d9d9d9",
                            }}
                        />
                    </Tooltip>
                    {/* Compare Button */}
                    <Tooltip title={isCompared ? "Karşılaştırmadan Kaldır" : "Karşılaştır"}>
                        <Button
                            shape="circle"
                            icon={<SwapOutlined />}
                            onClick={handleCompareChange}
                            style={{
                                backgroundColor: isCompared ? "#40a9ff" : "rgba(255, 255, 255, 0.9)",
                                borderColor: isCompared ? "#40a9ff" : "#d9d9d9",
                                color: isCompared ? "#fff" : "#595959",
                            }}
                        />
                    </Tooltip>
                </div>
            </div>

            {/* Thumbnails */}
            <Row gutter={[8, 8]} style={{ marginBottom: "10px" }}>
                {images.slice(0, 4).map((image, index) => (
                    <Col key={index} span={6}>
                        <img
                            alt={`Thumbnail ${index + 1}`}
                            src={image}
                            style={{
                                width: "100%",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                cursor: "pointer",
                                border: selectedImage === image ? "2px solid #1890ff" : "2px solid transparent",
                            }}
                            onClick={() => setSelectedImage(image)}
                        />
                    </Col>
                ))}
            </Row>

            {/* Ad Details */}
            <h3
                style={{
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={title}
            >
                {title}
            </h3>
            <p
                style={{
                    color: "#888",
                    margin: "5px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={`${user}`}
            >
                <UserOutlined /> {user}
            </p>
            <p
                style={{
                    color: "#888",
                    margin: "5px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={`${location}`}
            >
                <EnvironmentOutlined /> {location}
            </p>
            <p style={{ color: "#888", margin: "5px 0" }}>
                🐾 {pets ? "Evcil Hayvan" : "Evcil Hayvan Yok"}
            </p>
            <p style={{ color: "#888", margin: "5px 0" }}>
                🚬 {smoking ? "Sigara" : "Sigara Yok"}
            </p>
            <Row justify="space-between" align="middle">
                <Col>
                    <Tag color="green" style={{ fontSize: "16px" }}>
                        {price} ₺
                    </Tag>
                </Col>
                <Col>
                    <Link to={`/advertisement/${id}`}>
                        <Button type="primary">Detaylar</Button>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
}
