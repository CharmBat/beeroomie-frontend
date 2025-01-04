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
import { useParams } from "react-router-dom";
import ReportModal from "../../components/ReportModal";
import { getAdDetail } from "./AdApi";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function AdDetail() {
  const { adId } = useParams();
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
              objectFit: "cover",
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
                    height: "80px",
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
              <Row align="middle" gutter={16} style={{ marginBottom: "20px" }}>
                <Col>
                  <img
                    alt="User Avatar"
                    src={process.env.PUBLIC_URL + "/blankAvatar.svg"}
                    style={{
                      width: "48px",
                      height: "48px",
                      fontSize: "48px",
                      borderRadius: "50%",
                      background: "#f0f0f0",
                    }}
                  />
                </Col>
                <Col>
                  <Text strong>{adData.user_full_name}</Text>
                </Col>
              </Row>
              <Title level={3} style={{ marginBottom: "10px" }}>
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
              </Descriptions>
            </div>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Button type="default" block style={{ marginBottom: "10px" }}>
                Karşılaştır
              </Button>
              <Button type="primary" block style={{ marginBottom: "10px" }}>
                Teklif Ver
              </Button>
              <Button danger block onClick={openReportModal}>
                Kullanıcıyı Raporla
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <ReportModal
        reportedUserId={adData.userId}
        reportedUserName={adData.user}
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
      />
    </div>
  );
}
