import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdCard from './AdCard';

describe('AdCard Component', () => {
    const mockOnCompareChange = jest.fn();
    const mockOnFavoriteChange = jest.fn();

    const adProps = {
        id: '1',
        name: 'John Doe',
        title: 'Beautiful Apartment',
        user: 'Jane Doe',
        location: 'New York, USA',
        pets: true,
        smoking: false,
        price: '5000',
        images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        isCompared: false,
        onCompareChange: mockOnCompareChange,
        isFavorited: false,
        onFavoriteChange: mockOnFavoriteChange,
    };

    it('should render correctly with given props', () => {
        render(<AdCard {...adProps} />);

        // Check if the title, user, and location are rendered correctly
        expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('New York, USA')).toBeInTheDocument();
    });

    it('should call onFavoriteChange when the favorite button is clicked', () => {
        render(<AdCard {...adProps} />);

        const favoriteButton = screen.getByRole('button', { name: /Favorilere Ekle/i });

        // Simulate click event on the favorite button
        fireEvent.click(favoriteButton);

        expect(mockOnFavoriteChange).toHaveBeenCalledTimes(1);
        expect(mockOnFavoriteChange).toHaveBeenCalledWith('1');
    });

    it('should call onCompareChange when the compare button is clicked', () => {
        render(<AdCard {...adProps} />);

        const compareButton = screen.getByRole('button', { name: /Karşılaştır/i });

        // Simulate click event on the compare button
        fireEvent.click(compareButton);

        expect(mockOnCompareChange).toHaveBeenCalledTimes(1);
        expect(mockOnCompareChange).toHaveBeenCalledWith('1');
    });

    it('should render the price with correct currency', () => {
        render(<AdCard {...adProps} />);

        // Check if the price is rendered correctly
        expect(screen.getByText('5000 ₺')).toBeInTheDocument();
    });

    it('should display pet and smoking information correctly', () => {
        render(<AdCard {...adProps} />);

        // Check pet and smoking info
        expect(screen.getByText('🐾Evcil Hayvan olabilir')).toBeInTheDocument();
        expect(screen.getByText('🚬Sigara içilemez')).toBeInTheDocument();
    });

    it('should change selected image when a thumbnail is clicked', () => {
        render(<AdCard {...adProps} />);

        const thumbnails = screen.getAllByRole('img');
        
        // Click on a thumbnail to select a new image
        fireEvent.click(thumbnails[1]);

        // Check if the main image changes
        expect(screen.getByAltText('Beautiful Apartment')).toHaveAttribute('src', 'image2.jpg');
    });
});
