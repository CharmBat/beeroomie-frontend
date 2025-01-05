import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReportModal from './ReportModal'; // Adjust the import path as necessary
import { reportUser } from '../views/MiscApi'; // Adjust the import path as necessary
import { message } from 'antd';

// Mock the API call
jest.mock('../views/MiscApi', () => ({
    reportUser: jest.fn(),
}));

// Mock Ant Design's message component (if necessary)
jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    message: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('ReportModal Component', () => {
    const mockOnClose = jest.fn();
    const reportedUserId = "123";
    const reportedUserName = "Test User";

    test('renders modal and checks input field', () => {
        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        // Check if modal title is rendered
        expect(screen.getByText(`${reportedUserName} adlı kullanıcı rapor ediliyor`)).toBeInTheDocument();

        // Check if the input field is rendered
        const textArea = screen.getByPlaceholderText("Şikayetinizi detaylı bir şekilde açıklayın");
        expect(textArea).toBeInTheDocument();
    });

    test('handles input change', () => {
        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText("Şikayetinizi detaylı bir şekilde açıklayın");

        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: 'Test report description' } });

        expect(textArea.value).toBe('Test report description');
    });

    test('closes modal when "Vazgeç" button is clicked', () => {
        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        // Click on "Vazgeç" button to close the modal
        fireEvent.click(screen.getByText('Vazgeç'));

        // Check if onClose was called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls reportUser and closes modal on "Raporla" button click', async () => {
        const mockDescription = 'Test report description';
        reportUser.mockResolvedValueOnce({});

        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText("Şikayetinizi detaylı bir şekilde açıklayın");

        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: mockDescription } });

        // Click on "Raporla" button
        fireEvent.click(screen.getByText('Raporla'));

        // Wait for the API call to resolve
        await waitFor(() => expect(reportUser).toHaveBeenCalledWith({ reportedUserId, description: mockDescription }));

        // Check if onClose was called
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('does not call reportUser if description is empty', async () => {
        reportUser.mockResolvedValueOnce({});

        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        // Click on "Raporla" button without entering a description
        fireEvent.click(screen.getByText('Raporla'));

        // Wait for the API call to be called
        await waitFor(() => expect(reportUser).not.toHaveBeenCalled());

        // Check if onClose was not called
        expect(mockOnClose).not.toHaveBeenCalled();
    });

    test('shows error if reportUser fails', async () => {
        const mockDescription = 'Test report description';
        reportUser.mockRejectedValueOnce(new Error('Error'));

        render(<ReportModal reportedUserId={reportedUserId} reportedUserName={reportedUserName} isOpen={true} onClose={mockOnClose} />);

        const textArea = screen.getByPlaceholderText("Şikayetinizi detaylı bir şekilde açıklayın");

        // Simulate typing into the TextArea
        fireEvent.change(textArea, { target: { value: mockDescription } });

        // Click on "Raporla" button
        fireEvent.click(screen.getByText('Raporla'));

        // Wait for error message
        await waitFor(() => expect(message.error).toHaveBeenCalledWith('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'));
    });
});
