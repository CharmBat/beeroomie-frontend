import { Card, Form, Input, Select, Button, Row, Col } from 'antd';
import { TwoRadio, ThreeRadio } from "./FilterRadio";

const { Option } = Select;

export default function Filter({onFilterSubmit}) {
    const handleFilterSubmit = (values) => {
        console.log("Filter Values: ", values); // API bağlantısı yapılacak
        onFilterSubmit(values);
    };

    return (
        <Card title="Filtrele" style={{borderRadius: "8px"}}>
            <Form layout="vertical" onFinish={handleFilterSubmit}>
                {/* Price Range */}
                <Form.Item label="Fiyat">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item name="minPrice" noStyle>
                                <Input placeholder="Min" type="number"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="maxPrice" noStyle>
                                <Input placeholder="Max" type="number"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Location */}
                <Form.Item label="İlçe" name="district">
                    <Select placeholder="Kağıthane">
                        <Option value="kagithane">Kağıthane</Option>
                        <Option value="besiktas">Beşiktaş</Option>
                        <Option value="sariyer">Sarıyer</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Mahalle" name="neighborhood">
                    <Select placeholder="Seçin">
                        <Option value="sanayi">Sanayi Mahallesi</Option>
                        <Option value="levent">Levent Mahallesi</Option>
                    </Select>
                </Form.Item>

                {/* Room Count */}
                <Form.Item label="Oda Sayısı" name="roomCount">
                    <Select placeholder="Lütfen seçin">
                        <Option value="1">1 Oda</Option>
                        <Option value="2">2 Oda</Option>
                        <Option value="3">3 Oda</Option>
                    </Select>
                </Form.Item>

                {/* Preferences */}


                <ThreeRadio
                    label="Cinsiyet Tercihi"
                    name="genderPreference"
                    options={[
                        {label: "Erkek", value: "male"},
                        {label: "Kadın", value: "female"},
                        {label: "Yok", value: "none"},
                    ]}/>

                {/* Additional Preferences */}


                <TwoRadio
                    label="Eşyalı"
                    name="furnished"
                    options={[
                        {label: "Evet", value: "yes"},
                        {label: "Hayır", value: "no"},
                    ]}/>
                <TwoRadio
                    label="Evcil Hayvan"
                    name="pets"
                    options={[
                        {label: "Evet", value: "yes"},
                        {label: "Hayır", value: "no"},
                    ]}/>
                <TwoRadio
                    label="Sigara"
                    name="smoking"
                    options={[
                        {label: "Evet", value: "yes"},
                        {label: "Hayır", value: "no"},
                    ]}/>

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
