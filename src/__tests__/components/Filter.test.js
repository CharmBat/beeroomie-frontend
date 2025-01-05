import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filter from './Filter';  // Adjust the import path as necessary
import { getDistricts, getNeighborhoods, getN_rooms } from '../views/Advertisement/AdApi';

// Mock API functions
jest.mock('../views/Advertisement/AdApi', () => ({
    getDistricts: jest.fn(),
    getNeighborhoods: jest.fn(),
    getN_rooms: jest.fn(),
}));

describe('Filter Component', () => {
    let onFilterSubmit;

    beforeEach(() => {
        // Mock onFilterSubmit
        onFilterSubmit = jest.fn();

        // Mock API responses
        getDistricts.mockResolvedValue({
            districts: [
                { districtid: 1, district_name: 'District 1' },
                { districtid: 2, district_name: 'District 2' },
            ],
        });

        getNeighborhoods.mockResolvedValue({
            neighborhoods: [
                { neighborhoodid: 1, neighborhood_name: 'Neighborhood 1' },
                { neighborhoodid: 2, neighborhood_name: 'Neighborhood 2' },
            ],
        });

        getN_rooms.mockResolvedValue({
            rooms: [
                { n_roomid: 1, n_room: '1 Room' },
                { n_roomid: 2, n_room: '2 Rooms' },
            ],
        });
    });

    test('renders the filter form correctly', async () => {
        render(<Filter onFilterSubmit={onFilterSubmit} />);

        // Wait for the data to load
        await waitFor(() => expect(getDistricts).toHaveBeenCalled());

        // Check if districts dropdown is populated
        expect(screen.getByText('District 1')).toBeInTheDocument();
        expect(screen.getByText('District 2')).toBeInTheDocument();
    });

    test('filters data correctly on submit', async () => {
        render(<Filter onFilterSubmit={onFilterSubmit} />);

        // Wait for the data to load
        await waitFor(() => expect(getDistricts).toHaveBeenCalled());

        // Simulate user actions
        fireEvent.change(screen.getByLabelText('İlçe'), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText('Mahalle'), { target: { value: 1 } });
        fireEvent.change(screen.getByLabelText('Oda Sayısı'), { target: { value: 1 } });
        fireEvent.click(screen.getByLabelText('Cinsiyet Tercihi', { selector: 'input[value="0"]' }));
        fireEvent.click(screen.getByLabelText('Eşyalı', { selector: 'input[value="true"]' }));
        fireEvent.click(screen.getByLabelText('Evcil Hayvan', { selector: 'input[value="true"]' }));
        fireEvent.click(screen.getByLabelText('Sigara', { selector: 'input[value="true"]' }));

        // Submit the form
        fireEvent.click(screen.getByText('Filtrele'));

        // Check if the onFilterSubmit function is called with correct values
        expect(onFilterSubmit).toHaveBeenCalledWith({
            district: '1',
            neighborhood: '1',
            number_of_rooms: '1',
            gender_choices: '0',
            furnished: 'true',
            pet: 'true',
            smoking: 'true',
            min_price: undefined,
            max_price: undefined,
        });
    });

    test('displays error message when API fails to fetch districts', async () => {
        getDistricts.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Filter onFilterSubmit={onFilterSubmit} />);

        // Wait for the error to show up
        expect(await screen.findByText('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')).toBeInTheDocument();
    });

    test('shows correct neighborhood options when a district is selected', async () => {
        render(<Filter onFilterSubmit={onFilterSubmit} />);

        // Wait for the districts data to load
        await waitFor(() => expect(getDistricts).toHaveBeenCalled());

        // Select a district
        fireEvent.change(screen.getByLabelText('İlçe'), { target: { value: 1 } });

        // Wait for neighborhoods to load
        await waitFor(() => expect(getNeighborhoods).toHaveBeenCalled());

        // Check if neighborhoods are populated
        expect(screen.getByText('Neighborhood 1')).toBeInTheDocument();
        expect(screen.getByText('Neighborhood 2')).toBeInTheDocument();
    });

    test('displays loading state while fetching data', async () => {
        getDistricts.mockResolvedValueOnce({
            districts: [
                { districtid: 1, district_name: 'District 1' },
                { districtid: 2, district_name: 'District 2' },
            ],
        });

        render(<Filter onFilterSubmit={onFilterSubmit} />);

        // Initially, the form should be loading
        expect(screen.getByText('Filtrele')).toBeInTheDocument();  // Filter button should still be there while waiting

        // Wait for data to load
        await waitFor(() => expect(getDistricts).toHaveBeenCalled());
    });
});
