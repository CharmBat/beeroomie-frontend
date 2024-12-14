import { Card, Form, Input, Select, Checkbox, Button, Row, Col } from 'antd';

const { Option } = Select;

export default function Filter({ onFilterSubmit }) {
    const handleFilterSubmit = (values) => {
        console.log("Filter Values: ", values); // Replace with your filter logic
        onFilterSubmit(values);
    };

    return (
        <Card title="Filtrele" style={{ borderRadius: "8px" }}>
            <Form layout="vertical" onFinish={handleFilterSubmit}>
                {/* Price Range */}
                <Form.Item label="Fiyat">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item name="minPrice" noStyle>
                                <Input placeholder="Min" type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="maxPrice" noStyle>
                                <Input placeholder="Max" type="number" />
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
                <Form.Item label="Cinsiyet Tercihi" name="genderPreference">
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}><Checkbox value="male">Erkek</Checkbox></Col>
                            <Col span={8}><Checkbox value="female">Kadın</Checkbox></Col>
                            <Col span={8}><Checkbox value="none">Yok</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                {/* Additional Preferences */}
                <Form.Item label="Eşyalı" name="furnished">
                    <Checkbox.Group>
                        <Row>
                            <Col span={12}><Checkbox value="yes">Evet</Checkbox></Col>
                            <Col span={12}><Checkbox value="no">Hayır</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="Evcil Hayvan" name="pets">
                    <Checkbox.Group>
                        <Row>
                            <Col span={12}><Checkbox value="yes">Evet</Checkbox></Col>
                            <Col span={12}><Checkbox value="no">Hayır</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="Sigara" name="smoking">
                    <Checkbox.Group>
                        <Row>
                            <Col span={12}><Checkbox value="yes">Evet</Checkbox></Col>
                            <Col span={12}><Checkbox value="no">Hayır</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Filtrele
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
