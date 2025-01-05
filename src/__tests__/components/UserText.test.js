import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserText from './UserText';

describe('UserText Component', () => {
    const mockHandleLogout = jest.fn();

    beforeEach(() => {
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key) => {
                    const data = {
                        userId: '123',
                        userName: 'Test User',
                        userPic: 'https://example.com/test-avatar.jpg',
                    };
                    return data[key];
                }),
            },
            writable: true,
        });
    });

    test('renders correctly for desktop view', () => {
        render(
            <Router>
                <UserText handleLogout={mockHandleLogout} isMobile={false} />
            </Router>
        );

        // Verify avatar is rendered
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', 'https://example.com/test-avatar.jpg');

        // Verify username is rendered
        expect(screen.getByText('Test User')).toBeInTheDocument();

        // Verify dropdown options are present
        fireEvent.click(screen.getByText('Test User')); // Simulate clicking the dropdown
        expect(screen.getByText('Profilim')).toBeInTheDocument();
        expect(screen.getByText('Çıkış Yap')).toBeInTheDocument();
    });

    test('calls handleLogout when "Çıkış Yap" is clicked', () => {
        render(
            <Router>
                <UserText handleLogout={mockHandleLogout} isMobile={false} />
            </Router>
        );

        fireEvent.click(screen.getByText('Test User')); // Open the dropdown
        fireEvent.click(screen.getByText('Çıkış Yap')); // Click on logout

        // Verify handleLogout was called
        expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    });

    test('renders correctly for mobile view', () => {
        render(
            <Router>
                <UserText handleLogout={mockHandleLogout} isMobile={true} />
            </Router>
        );

        // Verify logout button is rendered
        const logoutButton = screen.getByRole('button', { name: 'Çıkış Yap' });
        expect(logoutButton).toBeInTheDocument();

        // Verify avatar and username are rendered in mobile layout
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', 'https://example.com/test-avatar.jpg');
        expect(screen.getByText('Test User')).toBeInTheDocument();

        // Simulate logout button click
        fireEvent.click(logoutButton);
        expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    });

    test('renders default avatar when userPic is not provided', () => {
        // Mock localStorage to return no userPic
        window.localStorage.getItem.mockImplementation((key) => {
            const data = {
                userId: '123',
                userName: 'Test User',
                userPic: null,
            };
            return data[key];
        });

        render(
            <Router>
                <UserText handleLogout={mockHandleLogout} isMobile={false} />
            </Router>
        );

        // Verify default avatar is rendered
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', `${process.env.PUBLIC_URL}/blankAvatar.svg`);
    });
});
