import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  // to mock the routing
import LogoText from './LogoText';  // Adjust the import path as necessary

describe('LogoText Component', () => {
    test('renders the logo image and text correctly', () => {
        render(
            <BrowserRouter>
                <LogoText />
            </BrowserRouter>
        );

        // Check if the logo image is rendered
        const logoImage = screen.getByAltText('BeeRoomie Logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', process.env.PUBLIC_URL + '/logo192.png');
        expect(logoImage).toHaveStyle('width: 40px');
        expect(logoImage).toHaveStyle('height: 40px');

        // Check if the text "BeeRoomie" is rendered
        const logoText = screen.getByText('BeeRoomie');
        expect(logoText).toBeInTheDocument();
        expect(logoText).toHaveClass('fs-4');
        expect(logoText).toHaveClass('text-dark');
    });

    test('renders the link with correct href', () => {
        render(
            <BrowserRouter>
                <LogoText />
            </BrowserRouter>
        );

        // Check if the link is rendered and it points to the home route
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
});
