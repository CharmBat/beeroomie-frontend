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
} from "antd";
import {ArrowLeftOutlined, PlusOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { TwoRadio, ThreeRadio } from "../../components/FilterRadio";
import TextArea from "antd/es/input/TextArea";
import {
    getAdDetail,
    getDistricts,
    getN_rooms,
    getNeighborhoods,
    getUtilities,
} from "./AdApi";
import {photoUpload} from "../MiscApi";



export default function EditAdvertisement() {
    const navigate = useNavigate();
    const adId = localStorage.getItem("userAd");

    // Form için
    const [form] = Form.useForm();
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [adDetails, setAdDetails] = useState(null);
    const [initialDistrict, setInitialDistrict] = useState(0);

    // utilities için
    const [utilites, setUtilities] = useState([]);
    const [selectedUtilities, setSelectedUtilities] = useState([]);

    console.log(utilites);
    // ilçeler için
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    console.log(districts);
    // mahalleler için
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
console.log(neighborhoods);
    // oda sayısı için
    const [n_roomid, setN_roomid] = useState([]);
    const [selectedN_roomid, setSelectedN_roomid] = useState(null);
console.log(n_roomid);
    useEffect(() => {
        const fetchAdvertisementDetails = async () => {
            try {
                const response = await getAdDetail(adId);
                if (response === null) {
                    message.error("İlan bilgileri alınamadı.");
                    return;
                }
                const adDetails = response.advertisement_list[0];
                // console.log(adDetails.districtid_fk);
                setInitialDistrict(adDetails.districtid_fk);
                setAdDetails(adDetails);
                //setSelectedDistrict(adDetails.districtid_fk);
                // setSelectedNeighborhood(adDetails.neighborhood);
                // setSelectedN_roomid(adDetails.n_room);
                // setSelectedUtilities(adDetails.utilities);
                setImageUrls(adDetails.photos || []);
                const transformedImageFiles = (adDetails.photos || []).map((url, index) => ({
                    uid: `-${index + 1}`,
                    name: `image-${index + 1}.png`,
                    status: 'done',
                    url,
                }));
                setImageFiles(transformedImageFiles || []);
            } catch (error) {
                message.error("İlan bilgileri alınamadı.");
            }
        };

        console.log(initialDistrict);

        const fetchInitialData = async () => {
            try {
                const utilitiesResponse = await getUtilities();
                const districtsResponse = await getDistricts();
                const neighborhoodsResponse = await getNeighborhoods(initialDistrict);
                const n_roomsResponse = await getN_rooms();
                setUtilities(utilitiesResponse.utilities);
                setDistricts(districtsResponse.districts);
                setNeighborhoods(neighborhoodsResponse.neighborhoods);
                setN_roomid(n_roomsResponse.n_rooms);
            } catch (error) {
                message.error("Başlangıç verileri alınamadı.");
            }
        };

        fetchAdvertisementDetails();
        fetchInitialData();
        form.setFieldsValue(adDetails);
    }, [adId, form, initialDistrict]);



    const handleN_roomidChange = (value) => {
        setSelectedN_roomid(value);
    };

    const handleNeighborhoodChange = (value) => {
        setSelectedNeighborhood(value);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };

    const handleUtilityChange = (value) => {
        setSelectedUtilities(value);
    };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Fotoğraf Yükle</div>
        </div>
    );

    const handlePhotoUpload = async (info) => {
        const file = info.file;
        if (file.status === "removed") {
            message.success("Fotoğraf silindi.")
            return;
        }
        if (!file) {
            message.error("Lütfen bir dosya seçin.");
            return;
        }
        try {
            const response = await photoUpload(file);
            if (response) {
                setImageUrls([...imageUrls, response]);
                const newFile = { ...file, url: response };
                setImageFiles([...imageFiles, newFile]);
                message.success("Fotoğraf yüklendi.");
            } else {
                message.error("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            console.error(error);
            message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        }
    };

    const handlePhotoRemove = (file) => {
        setImageFiles((prev) => prev.filter((item) => item.uid !== file.uid));
        setImageUrls((prev) => prev.filter((url) => url !== file.url));
    };

    const handleFormSubmit = async (values) => {
        console.log(values);
        // const payload = { ...values, photos: imageUrls, adId };
        // try {
        //     await updateAdvertisement(adId, payload);
        //     message.success("İlan başarıyla güncellendi!");
        //     navigate(`/advertisements/${adId}`);
        // } catch (error) {
        //     console.error(error);
        //     message.error("İlan güncellenemedi. Lütfen tekrar deneyin.");
        // }
    };

    return (
        <div style={{padding: "20px", minHeight: "100vh"}}>
            <div style={{maxWidth: "1000px", margin: "auto", padding: "20px"}}>
                {/* Image Upload */}
                <Upload
                    listType="picture-card"
                    fileList={imageFiles}
                    onChange={handlePhotoUpload}
                    onRemove={handlePhotoRemove}
                    beforeUpload={() => false}
                >
                    {imageUrls.length >= 6 ? null : uploadButton}
                </Upload>

                <Form style={{marginTop:"40px"}} form={form} layout="vertical" onFinish={handleFormSubmit}>
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
                        name="district"
                        label="İlçe"
                        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="İlçe seçiniz"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                        >
                            {/*{districts.map((option) => (*/}
                            {/*    <Option key={option.districtid} value={option.districtid}>*/}
                            {/*        {option.district_name}*/}
                            {/*    </Option>*/}
                            {/*))}*/}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="neighborhoodid_fk"
                        label="Mahalle"
                        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Mahalle seçiniz"
                            value={selectedNeighborhood}
                            onChange={handleNeighborhoodChange}
                        >
                            {/*{neighborhoods.map((option) => (*/}
                            {/*    <Option*/}
                            {/*        key={option.neighborhoodid}*/}
                            {/*        value={option.neighborhoodid}*/}
                            {/*    >*/}
                            {/*        {option.neighborhood_name}*/}
                            {/*    </Option>*/}
                            {/*))}*/}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Ev Adresi"
                        rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                    >
                        <TextArea placeholder="İlanınızın adresini giriniz." />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={4}>
                            <Form.Item
                                name="price"
                                label="Fiyatınız nedir?"
                                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                            >
                                <InputNumber placeholder="Fiyatınız" min={0} step={1} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="n_roomid_fk"
                                label="Oda Sayısı"
                                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                            >
                                <Select
                                    style={{ width: "60%" }}
                                    placeholder="Oda Sayısı"
                                    value={selectedN_roomid}
                                    onChange={handleN_roomidChange}
                                >
                                    {/*{n_roomid.map((option) => (*/}
                                    {/*    <Option*/}
                                    {/*        key={option.n_roomid}*/}
                                    {/*        value={option.n_roomid}*/}
                                    {/*    >*/}
                                    {/*        {option.n_room}*/}
                                    {/*    </Option>*/}
                                    {/*))}*/}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item
                                name="n_floor"
                                label="Binanız kaç katlı?"
                                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                            >
                                <InputNumber placeholder="Kat" min={0} step={1} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="floornumber"
                                label="Kaçıncı kattasınız?"
                                rules={[{ required: true, message: "Bu alan zorunludur!" }]}
                            >
                                <InputNumber placeholder="Kat" min={0} step={1} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="m2"
                                label="Büyüklük(m² cinsinden)"
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
                                { label: "Oda", value: false },
                                { label: "Ev", value: true },
                            ]}
                            rules={[{ required: true, message: 'İlan türünüz nedir?' }]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <TwoRadio
                            label="Eşyalı mı?"
                            name="furnished"
                            options={[
                                { label: "Evet", value: true },
                                { label: "Hayır", value: false },
                            ]}
                            rules={[{ required: true, message: 'Eşyalı mı?' }]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <TwoRadio
                            label="Sigara kullanıyor musunuz?"
                            name="smoking"
                            options={[
                                { label: "Evet", value: true },
                                { label: "Hayır", value: false },
                            ]}
                            rules={[{ required: true, message: 'Sigara kullanıyor musunuz?' }]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <TwoRadio
                            label="Evde hayvan bulunmasına izin verir misiniz?"
                            name="pet"
                            options={[
                                { label: "Evet", value: true },
                                { label: "Hayır", value: false },
                            ]}
                            rules={[{ required: true, message: 'Evde hayvan bulunmasına izin verir misiniz?' }]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <ThreeRadio
                            label="Cinsiyet Tercihi"
                            name="gender_choices"
                            options={[
                                { label: "Erkek", value: 0 },
                                { label: "Kadın", value: 1 },
                                { label: "Farketmez", value: 2 },
                            ]}
                            rules={[{ required: true, message: 'Cinsiyet Tercihi' }]}
                        />
                    </Form.Item>

                    <Form.Item name="utilites" label="Özellikler">
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Özellik ekle"
                            value={selectedUtilities}
                            onChange={handleUtilityChange}
                        >
                            {/*{utilites.map((option) => (*/}
                            {/*    <Option key={option.utilityid} value={option.utilityid}>*/}
                            {/*        {option.utility_name}*/}
                            {/*    </Option>*/}
                            {/*))}*/}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            İlanı Yayınla
                        </Button>
                        <Button
                            type="default"
                            block
                            icon={<ArrowLeftOutlined/>}
                            style={{marginTop: '10px'}}
                            onClick={() => navigate(-1)}
                        >
                            Geri Dön
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
