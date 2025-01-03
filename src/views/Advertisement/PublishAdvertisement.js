import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Row,
  Col,
  InputNumber,
  message,
  Select,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TwoRadio, ThreeRadio } from "../../components/FilterRadio"; // Adjust path if needed
import TextArea from "antd/es/input/TextArea";
import { getUtilities, uploadPhoto } from "./AdApi";

const { Option } = Select;

export default function PublishAdvertisement() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // utilities için
  const [utilites, setUtilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUtilities, setSelectedUtilities] = useState([]);

  const handleChange = async ({ file, fileList: newFileList }) => {
    if (file.status === "uploading") {
      try {
        const data = await uploadPhoto(file);
        if (data.url) {
          setImageUrls([...imageUrls, data.url]);
        } else {
          message.error(`Dosya yüklenirken sorun oluştu.`);
        }
      } catch (error) {
        message.error(`Dosya yüklenirken sorun oluştu.`);
      }
    }
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    const newImageUrls = imageUrls.filter((url) => url !== file.url);
    setFileList(newFileList);
    setImageUrls(newImageUrls);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await getUtilities();
        setUtilities(response.utilities);
      } catch (error) {
        message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleUtilityChange = (value) => {
    setSelectedUtilities(value);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Fotoğraf Yükle</div>
    </div>
  );

  const handleFormSubmit = (values) => {
    console.log("Form Values:", values);
    console.log("Uploaded Images URLs:", imageUrls);
    // Send form values and imageUrls to your endpoint
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        {/* Image Upload */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="photos" label="">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              onRemove={handleRemove}
              showUploadList={{
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
            <TextArea placeholder="İlanınız için bir açıklama giriniz." />
          </Form.Item>
          <Form.Item
            name="address"
            label="Ev Adresi"
            rules={[{ required: true, message: "Bu alan zorunludur!" }]}
          >
            <TextArea placeholder="İlanınızın adresini giriniz." />
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

          <Form.Item>
            <TwoRadio
              label="İlan türünüz nedir?"
              name="adtype"
              options={[
                { label: "Oda", value: "false" },
                { label: "Ev", value: "true" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <TwoRadio
              label="Eşyalı mı?"
              name="furnished"
              options={[
                { label: "Evet", value: "true" },
                { label: "Hayır", value: "false" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <TwoRadio
              label="Sigara kullanıyor musunuz?"
              name="smoking"
              options={[
                { label: "Evet", value: "true" },
                { label: "Hayır", value: "false" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <TwoRadio
              label="Evde hayvan bulunmasına izin verir misiniz?"
              name="pet"
              options={[
                { label: "Evet", value: "true" },
                { label: "Hayır", value: "false" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <ThreeRadio
              label="Cinsiyet Tercihi"
              name="genderPreference"
              options={[
                { label: "Erkek", value: "male" },
                { label: "Kadın", value: "female" },
                { label: "Farketmez", value: "none" },
              ]}
            />
          </Form.Item>

          <Form.Item name="utilities" label="Özellikler">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Özellik ekle"
              value={selectedUtilities}
              onChange={handleUtilityChange}
              loading={loading}
              notFoundContent={loading ? <Spin size="small" /> : null}
            >
              {utilites.map((option) => (
                <Option key={option.utilityid} value={option.utilityid}>
                  {option.utility_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

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
