import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './AppHeader'; // Assuming AppHeader is in the same folder
import { sendLogoutRequest } from "../views/Auth/AuthApi"; 

jest.mock('../views/Auth/AuthApi'); // Mocking the API call for logout

describe('AppHeader Component', () => {

    const mockSetIsLoggedIn = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); // Reset any mocks before each test
    });

    test('renders LogoText when user is not logged in', () => {
        render(
            <Router>
                <AppHeader isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
            </Router>
        );
        // Check if LogoText is rendered
        expect(screen.getByText('LogoText')).toBeInTheDocument();
    });

    test('renders menu items and user button for logged-in users', () => {
        localStorage.setItem("userRole", "Roomie"); // Set a role in localStorage
        render(
            <Router>
                <AppHeader isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
            </Router>
        );
        
        // Check if menu items are rendered
        expect(screen.getByText('İlanlar')).toBeInTheDocument();
        expect(screen.getByText('Karşılaştır')).toBeInTheDocument();
        expect(screen.getByText('Teklifler')).toBeInTheDocument();
        expect(screen.getByText('Favoriler')).toBeInTheDocument();
        
        // Check if 'İlan Ver' button is rendered for 'Roomie' role
        expect(screen.getByText('İlan Ver')).toBeInTheDocument();
    });

    test('calls logout function when logout button is clicked', async () => {
        localStorage.setItem("authToken", "fakeToken"); // Simulate a logged-in user
        localStorage.setItem("userRole", "Admin"); // Simulate 'Admin' role
        
        render(
            <Router>
                <AppHeader isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
            </Router>
        );

        // Click the logout button
        fireEvent.click(screen.getByText('Çıkış Yap'));

        // Ensure the logout request is called
        await waitFor(() => expect(sendLogoutRequest).toHaveBeenCalledWith('fakeToken'));

        // Check if the token is removed from localStorage
        expect(localStorage.getItem('authToken')).toBeNull();

        // Ensure setIsLoggedIn is called with false
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
    });

    test('renders admin panel button for Admin users', () => {
        localStorage.setItem("userRole", "Admin"); // Set 'Admin' role
        render(
            <Router>
                <AppHeader isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
            </Router>
        );

        // Check if Admin Panel button is rendered
        expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });

    test('renders mobile menu when screen width is small', () => {
        // Mock the window.innerWidth to simulate mobile screen size
        global.innerWidth = 500;
        global.dispatchEvent(new Event('resize'));

        render(
            <Router>
                <AppHeader isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
            </Router>
        );

        // Check if menu is rendered in vertical mode (for mobile)
        expect(screen.getByText('İlanlar')).toBeInTheDocument();
        expect(screen.getByText('Karşılaştır')).toBeInTheDocument();

        // Check if the drawer button is visible
        expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });

});
