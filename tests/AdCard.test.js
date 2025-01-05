import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdCard from '../src/components/AdCard';
import { BrowserRouter as Router } from 'react-router-dom';

const mockOnCompareChange = jest.fn();
const mockOnFavoriteChange = jest.fn();

const defaultProps = {
    id: 1,
    title: 'Test Ad',
    user: 'John Doe',
    location: 'Istanbul',
    pets: true,
    smoking: false,
    price: 1000,
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
    isCompared: false,
    onCompareChange: mockOnCompareChange,
    isFavorited: false,
    onFavoriteChange: mockOnFavoriteChange,
};

const renderComponent = (props = {}) => {
    return render(
        React.createElement(Router, null, React.createElement(AdCard, { ...defaultProps, ...props }))
    );
};

test('renders AdCard with correct details', () => {
    renderComponent();
    expect(screen.getByText('Test Ad')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Istanbul')).toBeInTheDocument();
    expect(screen.getByText('Evcil Hayvan')).toBeInTheDocument();
    expect(screen.getByText('Sigara Yok')).toBeInTheDocument();
    expect(screen.getByText('1000 ₺')).toBeInTheDocument();
});

// test('calls onFavoriteChange when favorite button is clicked', () => {
//     renderComponent();
//     const favoriteButton = screen.getByRole('button', { name: /Favorilere Ekle/i });
//     fireEvent.click(favoriteButton);
//     expect(mockOnFavoriteChange).toHaveBeenCalledWith(1);
// });

// test('calls onCompareChange when compare button is clicked', () => {
//     renderComponent();
//     const compareButton = screen.getByRole('button', { name: /Karşılaştır/i });
//     fireEvent.click(compareButton);
//     expect(mockOnCompareChange).toHaveBeenCalledWith(1);
// });

// test('changes selected image when thumbnail is clicked', () => {
//     renderComponent();
//     const thumbnails = screen.getAllByRole('img');
//     fireEvent.click(thumbnails[1]);
//     expect(thumbnails[1]).toHaveStyle('border: 2px solid #1890ff');
// });
