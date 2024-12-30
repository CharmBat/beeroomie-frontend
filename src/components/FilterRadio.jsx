import { Form, Radio } from 'antd';

export const TwoRadio = ({ label, name, options, onChange, rules = [] }) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Radio.Group buttonStyle="solid" className="w-100" onChange={onChange}>
                {options.map((option) => (
                    <Radio.Button
                        key={option.value}
                        value={option.value}
                        className="w-50 text-center">
                        {option.label}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

export const ThreeRadio = ({ label, name, options, onChange, rules = [] }) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            <Radio.Group buttonStyle="solid" className="w-100" onChange={onChange}>
                {options.map((option) => (
                    <Radio.Button
                        key={option.value}
                        value={option.value}
                        className="text-center"
                        style={{ width: "33.3%" }}>
                        {option.label}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};
