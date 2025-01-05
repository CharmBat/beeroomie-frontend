import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Favorite from '../Favorite'; // Adjust the path according to your folder structure
import { getFavorites } from '../MiscApi';
import { useFavorites } from '../../hooks/useFavorites';
import { useCompare } from '../../hooks/useCompare';
import userEvent from '@testing-library/user-event';
import { message } from 'antd';

jest.mock('../MiscApi', () => ({
    getFavorites: jest.fn(),
}));

jest.mock('../../hooks/useFavorites', () => ({
    useFavorites: jest.fn(),
}));

jest.mock('../../hooks/useCompare', () => ({
    useCompare: jest.fn(),
}));

jest.mock('antd', () => ({
    ...jest.requireActual('antd'),
    message: {
        error: jest.fn(),
    },
}));

describe('Favorite Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading spinner initially', async () => {
        getFavorites.mockResolvedValueOnce([]);
        
        render(<Favorite />);

        expect(screen.getByRole('status')).toBeInTheDocument(); // Ant Design's Spin component renders with a role of "status".

        await waitFor(() => {
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });
    });

    it('renders favorite ads when data is available', async () => {
        const mockFavorites = [
            {
                id: 1,
                adpageid: 'ad1',
                title: 'Ad Title 1',
                address: 'Location 1',
                pet: true,
                smoking: false,
                price: 1000,
                photos: ['image1.jpg'],
            },
            {
                id: 2,
                adpageid: 'ad2',
                title: 'Ad Title 2',
                address: 'Location 2',
                pet: false,
                smoking: true,
                price: 2000,
                photos: ['image2.jpg'],
            },
        ];

        getFavorites.mockResolvedValueOnce(mockFavorites);
        useFavorites.mockReturnValue({
            favorites: ['ad1'],
            handleFavoriteChange: jest.fn(),
        });
        useCompare.mockReturnValue({
            compareAds: ['ad2'],
            handleCompareChange: jest.fn(),
        });

        render(<Favorite />);

        await waitFor(() => {
            expect(screen.getByText('Ad Title 1')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Ad Title 2')).toBeInTheDocument();
        });
    });

    it('renders empty state when no favorites are present', async () => {
        getFavorites.mockResolvedValueOnce([]);
        
        render(<Favorite />);

        await waitFor(() => {
            expect(screen.getByText(/Henüz bir favorin yok/i)).toBeInTheDocument();
        });
    });

    it('displays an error message if fetching favorites fails', async () => {
        getFavorites.mockRejectedValueOnce(new Error('API Error'));

        render(<Favorite />);

        await waitFor(() => {
            expect(message.error).toHaveBeenCalledWith(
                'Favoriler alınırken bir hata oluştu.'
            );
        });
    });

    it('calls the handleFavoriteChange function when a favorite button is clicked', async () => {
        const mockFavorites = [
            {
                id: 1,
                adpageid: 'ad1',
                title: 'Ad Title 1',
                address: 'Location 1',
                pet: true,
                smoking: false,
                price: 1000,
                photos: ['image1.jpg'],
            },
        ];

        const handleFavoriteChangeMock = jest.fn();

        getFavorites.mockResolvedValueOnce(mockFavorites);
        useFavorites.mockReturnValue({
            favorites: ['ad1'],
            handleFavoriteChange: handleFavoriteChangeMock,
        });
        useCompare.mockReturnValue({
            compareAds: [],
            handleCompareChange: jest.fn(),
        });

        render(<Favorite />);

        await waitFor(() => {
            expect(screen.getByText('Ad Title 1')).toBeInTheDocument();
        });

        const favoriteButton = screen.getByRole('button', { name: /Favori/i }); // Adjust if the button text is different
        userEvent.click(favoriteButton);

        expect(handleFavoriteChangeMock).toHaveBeenCalledWith('ad1');
    });
});
