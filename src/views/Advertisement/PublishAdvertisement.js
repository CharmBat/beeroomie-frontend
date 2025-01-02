import React, { useState } from "react";
import { Form, Input, Button, Upload, Row, Col, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TwoRadio, ThreeRadio } from "../../components/FilterRadio"; // Adjust path if needed
import TextArea from "antd/es/input/TextArea";

export default function PublishAdvertisement() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Fotoğraf Yükle</div>
    </div>
  );

  const handleFormSubmit = (values) => {
    console.log("Form Values:", values);
    console.log("Uploaded Images:", fileList);
    // endpoint bağlanıcak
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        {/* Image Upload */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="photos" label="">
            <Upload
              action="/upload" // Placeholder action for now
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange} // buraya before upload eklenecek form gönderilirken cdne gidicek şimdi hata veriyo
              showUploadList={{
                // ayrıca form en az 1 resim olmadan gönderilemiyecek
                showPreviewIcon: false,
              }}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label="Başlık"
            rules={[{ required: true, message: "Bu alan zorunludur!" }]}
          >
            <Input placeholder="İlanınıza bir başlık giriniz." />
          </Form.Item>
            <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: "Bu alan zorunludur!" }]}
          >
            <TextArea placeholder="İlanınız için bir açıklama giriniz."/>
          </Form.Item>
          <Form.Item
            name="address"
            label="Ev Adresi"
            rules={[{ required: true, message: "Bu alan zorunludur!" }]}
          >
            <TextArea placeholder="İlanınızın adresini giriniz."/>
          </Form.Item>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="price"
                label="Fiyatınız nedir?"
                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
              >
                <InputNumber placeholder="Fiyatınız" min={0} step={1} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="n_floor"
                label="Binanız kaç katlı?"
                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
              >
                <InputNumber placeholder="Kat" min={0} step={1} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="floornumber"
                label="Kaçıncı kattasınız?"
                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
              >
                <InputNumber placeholder="Kat" min={0} step={1} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="m2"
                label="Büyüklük(m2 cinsinden)"
                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
              >
                <InputNumber placeholder="Büyüklük" min={0} step={1} />
              </Form.Item>
            </Col>
          </Row>

          <TwoRadio
            label="İlan türünüz nedir?"
            name="adtype"
            options={[
              { label: "Oda", value: "false" },
              { label: "Ev", value: "true" },
            ]}
          />

          {/* TwoRadio Component */}
          <TwoRadio
            label="Eşyalı mı?"
            name="furnished"
            options={[
              { label: "Evet", value: "true" },
              { label: "Hayır", value: "false" },
            ]}
          />

          <TwoRadio
            label="Sigara kullanıyor musunuz?"
            name="smoking"
            options={[
              { label: "Evet", value: "true" },
              { label: "Hayır", value: "false" },
            ]}
          />

          <TwoRadio
            label="Evde hayvan bulunmasına izin verir misiniz?"
            name="pet"
            options={[
              { label: "Evet", value: "true" },
              { label: "Hayır", value: "false" },
            ]}
          />

          {/* ThreeRadio Component */}
          <ThreeRadio
            label="Cinsiyet Tercihi"
            name="genderPreference"
            options={[
              { label: "Erkek", value: "male" },
              { label: "Kadın", value: "female" },
              { label: "Farketmez", value: "none" },
            ]}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Formu Gönder
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
