import { render, screen, fireEvent } from '@testing-library/react';
import OfferCard from './OfferCard'; // Adjust the import path as necessary

describe('OfferCard Component', () => {
    const mockWithdrawOffer = jest.fn();
    
    const offerCardProps = {
        ppurl: "https://example.com/profile.jpg",
        offerer_name: "John Doe",
        adId: "123",
        send_message: "This is a message.",
        isOfferByYou: false,
        contact_info: "johndoe@example.com",
        onWithdrawOffer: mockWithdrawOffer,
    };

    test('renders the offer card with correct data', () => {
        render(<OfferCard {...offerCardProps} />);

        // Check if the offerer's name is rendered
        expect(screen.getByText("John Doe")).toBeInTheDocument();

        // Check if the contact info is rendered
        expect(screen.getByText("İletişim: johndoe@example.com")).toBeInTheDocument();

        // Check if the message text is rendered
        expect(screen.getByText("This is a message.")).toBeInTheDocument();

        // Check if the profile image is rendered
        const avatarImage = screen.getByRole('img');
        expect(avatarImage).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });

    test('renders the "Withdraw Offer" button when offer is by the user', () => {
        render(<OfferCard {...{ ...offerCardProps, isOfferByYou: true }} />);

        // Check if the "Withdraw Offer" button is rendered
        expect(screen.getByText('Teklifi Geri Çek')).toBeInTheDocument();
    });

    test('does not render contact info when offer is by the user', () => {
        render(<OfferCard {...{ ...offerCardProps, isOfferByYou: true }} />);

        // Ensure contact info is not rendered
        expect(screen.queryByText('İletişim: johndoe@example.com')).not.toBeInTheDocument();
    });

    test('calls onWithdrawOffer when the "Withdraw Offer" button is clicked', () => {
        render(<OfferCard {...{ ...offerCardProps, isOfferByYou: true }} />);

        // Click the "Withdraw Offer" button
        fireEvent.click(screen.getByText('Teklifi Geri Çek'));

        // Check if the mock function was called
        expect(mockWithdrawOffer).toHaveBeenCalledTimes(1);
    });

    test('renders a default avatar when no ppurl is provided', () => {
        render(<OfferCard {...{ ...offerCardProps, ppurl: null }} />);

        // Check if the default avatar is rendered
        const avatarImage = screen.getByRole('img');
        expect(avatarImage).toHaveAttribute('src', process.env.PUBLIC_URL + '/blankAvatar.svg');
    });
});
