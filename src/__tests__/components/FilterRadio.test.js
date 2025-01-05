import { render, screen, fireEvent } from '@testing-library/react';
import { TwoRadio, ThreeRadio } from './RadioComponents';  // Adjust the import path as necessary
import { Form } from 'antd';

describe('TwoRadio Component', () => {
    let onChangeMock;

    beforeEach(() => {
        onChangeMock = jest.fn();
    });

    test('renders the TwoRadio component correctly', () => {
        const options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ];

        render(
            <Form>
                <TwoRadio label="Choose Option" name="option" options={options} onChange={onChangeMock} />
            </Form>
        );

        // Check if the options are rendered
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    test('fires onChange when a radio option is selected', () => {
        const options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ];

        render(
            <Form>
                <TwoRadio label="Choose Option" name="option" options={options} onChange={onChangeMock} />
            </Form>
        );

        // Simulate selecting Option 1
        fireEvent.click(screen.getByText('Option 1'));

        // Verify that the onChange handler was called with the selected value
        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '1' } }));

        // Simulate selecting Option 2
        fireEvent.click(screen.getByText('Option 2'));

        // Verify that the onChange handler was called with the selected value
        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '2' } }));
    });
});

describe('ThreeRadio Component', () => {
    let onChangeMock;

    beforeEach(() => {
        onChangeMock = jest.fn();
    });

    test('renders the ThreeRadio component correctly', () => {
        const options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
        ];

        render(
            <Form>
                <ThreeRadio label="Choose Option" name="option" options={options} onChange={onChangeMock} />
            </Form>
        );

        // Check if the options are rendered
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    test('fires onChange when a radio option is selected in ThreeRadio', () => {
        const options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
        ];

        render(
            <Form>
                <ThreeRadio label="Choose Option" name="option" options={options} onChange={onChangeMock} />
            </Form>
        );

        // Simulate selecting Option 1
        fireEvent.click(screen.getByText('Option 1'));

        // Verify that the onChange handler was called with the selected value
        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '1' } }));

        // Simulate selecting Option 2
        fireEvent.click(screen.getByText('Option 2'));

        // Verify that the onChange handler was called with the selected value
        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '2' } }));

        // Simulate selecting Option 3
        fireEvent.click(screen.getByText('Option 3'));

        // Verify that the onChange handler was called with the selected value
        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '3' } }));
    });
});
