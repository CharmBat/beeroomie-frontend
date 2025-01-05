import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  Spin,
  Card,
  Descriptions,
  Button,
  Tag,
  Typography,
  Collapse,
  message,
} from "antd";
import {Link, useParams} from "react-router-dom";
import ReportModal from "../../components/ReportModal";
import OfferModal from "../../components/OfferModal";
import {getAdDetail, removeAd} from "./AdApi";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function AdDetail() {
  const { adId } = useParams();
  const userAd = localStorage.getItem("userAd");
  const userRole = localStorage.getItem("userRole");
  const isRoomie = userRole === "Roomie";
  const isUserAd = userAd === adId;
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const data = await getAdDetail(adId);
        if (data.error_status === 200) {
          setAdData(data.advertisement_list[0]);
          setSelectedImage(data.advertisement_list[0].photos[0]);
          setLoading(false);
        } else {
          message.error(data.system_message);
        }
      } catch (error) {
        message.error(
          "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin."
        );
      }
    };
    fetchAd();
  }, [adId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const openOfferModal = () => {
    setIsOfferModalOpen(true);
  };

  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
  };

  const handleRemoveAd = async () => {
    try {
      const response = await removeAd(adId);
      if (response.error_status === 200) {
        message.success("İlan başarıyla kaldırıldı.");
        localStorage.setItem("userAd", null);
        localStorage.setItem("userRole", "Roomie");
        window.location.href = "/";
      } else {
        message.error(response.system_message);
      }
    } catch (error) {
      message.error(
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin."
      );
    }
  }

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <Row
        gutter={16}
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Left Section */}
        <Col
          xs={24}
          md={16}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Title */}
          <Title level={3} style={{ marginBottom: "20px" }}>
            {adData.title}
          </Title>

          {/* Main Image */}
          <Image
            src={selectedImage}
            alt="Selected"
            preview={false}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />

          {/* Gallery Thumbnails */}
          <Row gutter={8}>
            {adData.photos.map((photo, index) => (
              <Col span={6} key={index}>
                <Image
                  src={photo}
                  alt={`Thumbnail ${index}`}
                  preview={false}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      photo === selectedImage
                        ? "2px solid #1890ff"
                        : "2px solid transparent",
                    borderRadius: "5px",
                  }}
                  onClick={() => setSelectedImage(photo)} // Update selected image
                />
              </Col>
            ))}
          </Row>

          {/* Collapsible Sections */}
          <Collapse
            defaultActiveKey={["1"]}
            style={{
              marginTop: "20px",
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            <Panel header="Açıklama" key="1">
              <Text>{adData.description}</Text>
            </Panel>
            <Panel header="Adres Tarifi" key="2">
              <Text>{`${adData.address}, ${adData.neighborhood}, ${adData.district}`}</Text>
            </Panel>
          </Collapse>
        </Col>

        {/* Right Section */}
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: "8px",
              padding: "20px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Row align="middle" gutter={16} style={{ marginBottom: "20px"}}>
                  <Link to={`/profile/${adData.userid_fk}`}
                        className="d-flex align-items-center gap-2 justify-content-center">
                      <img
                          alt="User Avatar"
                          src={adData.ppurl || process.env.PUBLIC_URL + "/blankAvatar.svg"}
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "48px",
                            borderRadius: "50%",
                            marginLeft: "10px",
                            marginRight: "10px",
                            background: "#f0f0f0",
                          }}
                      />
                    <Text strong>{adData.user_full_name}</Text>
                  </Link>
              </Row>
              <Title level={3} style={{marginBottom: "10px"}}>
                <Tag color="green">{adData.price} ₺</Tag>
              </Title>
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="İlan Tipi">
                  {adData.adType === true ? "Ev" : "Oda"}
                </Descriptions.Item>
                <Descriptions.Item label="İlan Tarihi">
                  {adData.ad_date}
                </Descriptions.Item>
                <Descriptions.Item label="Eşyalı">
                  {adData.furnished === true ? "Evet" : "Hayır"}
                </Descriptions.Item>
                <Descriptions.Item label="Cinsiyet Tercihi">
                  {(() => {
                    switch (adData.gender_choices) {
                      case 0:
                        return "Erkek";
                      case 1:
                        return "Kadın";
                      case 2:
                        return "Farketmez";
                      default:
                        return "Bilinmiyor";
                    }
                  })()}
                </Descriptions.Item>
                <Descriptions.Item label="m²">{adData.m2}</Descriptions.Item>
                <Descriptions.Item label="Oda Sayısı">
                  {adData.n_room}
                </Descriptions.Item>
                <Descriptions.Item label="Kat Sayısı">
                  {adData.n_floor}
                </Descriptions.Item>
                <Descriptions.Item label="Kat">
                  {adData.floornumber}
                </Descriptions.Item>
                <Descriptions.Item label="Sigara">
                  {adData.smoking === true ? "Evet" : "Hayır"}
                </Descriptions.Item>
                <Descriptions.Item label="Evcil Hayvan">
                  {adData.pet === true ? "Evet" : "Hayır"}
                </Descriptions.Item>
                <Descriptions.Item label="Özellikler">
                  {adData.utilities.join(", ")}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
                {isUserAd ? (
                  <Button type="primary" block style={{ marginBottom: "10px" }}>
                    <Link to={`/edit-advertisement/${userAd}`}>İlanı Düzenle</Link>
                  </Button>
                ): null}
                {isRoomie ? (
                  <Button type="primary" block style={{ marginBottom: "10px" }} onClick={openOfferModal}>
                    Teklif Ver
                  </Button>
                ) : null}
                {isUserAd ? (
                  <Button danger block onClick={handleRemoveAd}>
                      İlanı Kaldır
                  </Button>
                ) : (
                  <Button danger block onClick={openReportModal}>
                      Kullanıcıyı Raporla
                  </Button>
                )}
            </Row>
          </Card>
        </Col>
      </Row>
      <ReportModal
        reportedUserId={adData.userid_fk}
        reportedUserName={adData.user_full_name}
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
      />
      <OfferModal
        adId={adData.adpageid}
        isOpen={isOfferModalOpen}
        onClose={closeOfferModal}
      />
    </div>
  );
}
