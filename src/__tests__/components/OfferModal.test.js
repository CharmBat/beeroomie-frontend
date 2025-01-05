import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OfferModal from './OfferModal'; // Adjust the import path as necessary
import { createOffer } from '../views/Advertisement/AdApi'; // Adjust the import path as necessary
import { message } from 'antd';

// Mock the API call
jest.mock('../views/Advertisement/AdApi', () => ({
    createOffer: jest.fn(),
}));

// Mock Ant Design's message component
jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    message: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('OfferModal Component', () => {
    const mockOnClose = jest.fn();
    const adId = "123";

    test('renders modal and checks input field', () => {
        render(<OfferModal adId={adId} isOpen={true} onClose={mockOnClose} />);

        // Check if modal title is rendered
        expect(screen.getByText('Teklif gönder')).toBeInTheDocument();

        // Check if the input field is rendered
        const textArea = screen.getByPlaceholderText(
            "Teklifinize eklemek istediğiniz notları buraya yazabilirsiniz."
        );
        expect(textArea).toBeInTheDocument();
    });

    test('handles input change', () => {
        render(<OfferModal adId={adId} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText(
            "Teklifinize eklemek istediğiniz notları buraya yazabilirsiniz."
        );

        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: 'Test offer description' } });

        expect(textArea.value).toBe('Test offer description');
    });

    test('closes modal when "Vazgeç" button is clicked', () => {
        render(<OfferModal adId={adId} isOpen={true} onClose={mockOnClose} />);

        // Click on "Vazgeç" button to close the modal
        fireEvent.click(screen.getByText('Vazgeç'));

        // Check if onClose was called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls createOffer and shows success message on "Teklif Ver" button click', async () => {
        const mockDescription = 'Test offer description';
        createOffer.mockResolvedValueOnce({});

        render(<OfferModal adId={adId} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText(
            "Teklifinize eklemek istediğiniz notları buraya yazabilirsiniz."
        );
        
        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: mockDescription } });

        // Click on "Teklif Ver" button
        fireEvent.click(screen.getByText('Teklif Ver'));

        // Wait for success message
        await waitFor(() => expect(message.success).toHaveBeenCalledWith('Teklifiniz başarıyla gönderildi.'));

        // Check if onClose was called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('shows error message if createOffer fails', async () => {
        const mockDescription = 'Test offer description';
        createOffer.mockRejectedValueOnce(new Error('Error'));

        render(<OfferModal adId={adId} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText(
            "Teklifinize eklemek istediğiniz notları buraya yazabilirsiniz."
        );

        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: mockDescription } });

        // Click on "Teklif Ver" button
        fireEvent.click(screen.getByText('Teklif Ver'));

        // Wait for error message
        await waitFor(() => expect(message.error).toHaveBeenCalledWith('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'));
    });
});
