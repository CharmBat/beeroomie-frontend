import {Card, Form, Input, Select, Button, Row, Col, message, Checkbox} from 'antd';
import React, {useEffect, useState} from "react";
import {
    getDistricts,
    getNeighborhoods,
    getN_rooms,
} from "../views/Advertisement/AdApi";


const { Option } = Select;

export default function Filter({onFilterSubmit}) {
    const [districts, setDistricts] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [n_roomid, setN_roomid] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedFurnished, setSelectedFurnished] = useState(null);
    const [selectedPets, setSelectedPets] = useState(null);
    const [selectedSmoking, setSelectedSmoking] = useState(null);

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await getDistricts();
                setDistricts(response.districts);
            } catch (error) {
                message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        };

        fetchDistricts();
    }, []);

    useEffect(() => {
        const fetchNeighborhoods = async () => {
            if (selectedDistrict === null) return;
            try {
                const response = await getNeighborhoods(selectedDistrict);
                setNeighborhoods(response.neighborhoods);
            } catch (error) {
                message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        };

        fetchNeighborhoods();
    }, [selectedDistrict]);

    useEffect(() => {
        const fetchN_room = async () => {
            try {
                const response = await getN_rooms();
                setN_roomid(response.rooms);
            } catch (error) {
                message.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        };

        fetchN_room();
    }, []);

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };

    const handleCheckboxChange = (key, value) => {
        switch (key) {
            case "gender":
                setSelectedGender((prev) => (prev === value ? null : value));
                break;
            case "furnished":
                setSelectedFurnished((prev) => (prev === value ? null : value));
                break;
            case "pets":
                setSelectedPets((prev) => (prev === value ? null : value));
                break;
            case "smoking":
                setSelectedSmoking((prev) => (prev === value ? null : value));
                break;
            default:
                break;
        }
    };


    const handleFilterSubmit = (values) => {
        onFilterSubmit(values);
    };

    return (
        <Card title="Filtrele" style={{borderRadius: "8px"}}>
            <Form layout="vertical" onFinish={handleFilterSubmit}>
                {/* Price Range */}
                <Form.Item label="Fiyat">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item name="min_price" noStyle>
                                <Input placeholder="Min" type="number"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="max_price" noStyle>
                                <Input placeholder="Max" type="number"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Location */}
                <Form.Item label="İlçe" name="district">
                    <Select placeholder="Seçin" onChange={handleDistrictChange}>
                        {districts.map((option) => (
                            <Option key={option.districtid} value={option.districtid}>
                                {option.district_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Mahalle" name="neighborhood">
                    <Select placeholder="Seçin">
                        {neighborhoods.map((option) => (
                            <Option
                                key={option.neighborhoodid}
                                value={option.neighborhoodid}
                            >
                                {option.neighborhood_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Room Count */}
                <Form.Item label="Oda Sayısı" name="number_of_rooms">
                    <Select placeholder="Seçin">
                        {n_roomid.map((option) => (
                            <Option
                                key={option.n_roomid}
                                value={option.n_roomid}
                            >
                                {option.n_room}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Gender Preference */}
                <Form.Item label="Cinsiyet Tercihi">
                    <div className="toggle-group">
                        <Checkbox
                            className={`toggle-button ${selectedGender === "0" ? "active" : ""}`}
                            style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}
                            onChange={() => handleCheckboxChange("gender", "0")}
                        >
                            Erkek
                        </Checkbox>
                        <Checkbox
                            className={`toggle-button ${selectedGender === "1" ? "active" : ""}`}
                            onChange={() => handleCheckboxChange("gender", "1")}
                        >
                            Kadın
                        </Checkbox>
                        <Checkbox
                            className={`toggle-button ${selectedGender === "2" ? "active" : ""}`}
                            style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}
                            onChange={() => handleCheckboxChange("gender", "2")}
                        >
                            Yok
                        </Checkbox>
                    </div>
                </Form.Item>

                {/* Furnished */}
                <Form.Item label="Eşyalı">
                    <div className="toggle-group">
                        <Checkbox
                            className={`toggle-button ${selectedFurnished === "true" ? "active" : ""}`}
                            style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}
                            onChange={() => handleCheckboxChange("furnished", "true")}
                        >
                            Evet
                        </Checkbox>
                        <Checkbox
                            className={`toggle-button ${selectedFurnished === "false" ? "active" : ""}`}
                            style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}
                            onChange={() => handleCheckboxChange("furnished", "false")}
                        >
                            Hayır
                        </Checkbox>
                    </div>
                </Form.Item>

                {/* Pets */}
                <Form.Item label="Evcil Hayvan">
                    <div className="toggle-group">
                        <Checkbox
                            className={`toggle-button ${selectedPets === "true" ? "active" : ""}`}
                            style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}
                            onChange={() => handleCheckboxChange("pets", "true")}
                        >
                            Evet
                        </Checkbox>
                        <Checkbox
                            className={`toggle-button ${selectedPets === "false" ? "active" : ""}`}
                            style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}
                            onChange={() => handleCheckboxChange("pets", "false")}
                        >
                            Hayır
                        </Checkbox>
                    </div>
                </Form.Item>

                {/* Smoking */}
                <Form.Item label="Sigara">
                    <div className="toggle-group">
                        <Checkbox
                            className={`toggle-button ${selectedSmoking === "true" ? "active" : ""}`}
                            style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}
                            onChange={() => handleCheckboxChange("smoking", "true")}
                        >
                            Evet
                        </Checkbox>
                        <Checkbox
                            className={`toggle-button ${selectedSmoking === "false" ? "active" : ""}`}
                            style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}
                            onChange={() => handleCheckboxChange("smoking", "false")}
                        >
                            Hayır
                        </Checkbox>
                    </div>
                </Form.Item>

                {/* Submit Button */
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Filtrele
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
        ;
}
