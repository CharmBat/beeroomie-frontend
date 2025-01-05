import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Advertisement from './Advertisement';
import { getAllAdvertisements, filterAdvertisements } from './AdApi';
import { useCompare } from '../../hooks/useCompare';
import { useFavorites } from '../../hooks/useFavorites';
import { message } from 'antd';

jest.mock('./AdApi');
jest.mock('../../hooks/useCompare');
jest.mock('../../hooks/useFavorites');
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: { error: jest.fn() },
}));

describe('Advertisement Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the filter and ad cards', async () => {
    const mockAds = [
      {
        adpageid: '1',
        full_name: 'John Doe',
        title: 'Ad Title 1',
        address: 'Location 1',
        pet: 'Yes',
        smoking: 'No',
        price: 1000,
        photos: ['image1.jpg'],
      },
      {
        adpageid: '2',
        full_name: 'Jane Doe',
        title: 'Ad Title 2',
        address: 'Location 2',
        pet: 'No',
        smoking: 'Yes',
        price: 2000,
        photos: ['image2.jpg'],
      },
    ];

    getAllAdvertisements.mockResolvedValue({
      error_status: 200,
      advertisement_list: mockAds,
    });

    useCompare.mockReturnValue({
      compareAds: [],
      handleCompareChange: jest.fn(),
    });

    useFavorites.mockReturnValue({
      favorites: [],
      handleFavoriteChange: jest.fn(),
    });

    render(<Advertisement />);

    await waitFor(() => {
      expect(getAllAdvertisements).toHaveBeenCalledWith(1);
    });

    mockAds.forEach((ad) => {
      expect(screen.getByText(ad.title)).toBeInTheDocument();
      expect(screen.getByText(ad.address)).toBeInTheDocument();
    });
  });

  it('displays error message on API failure', async () => {
    getAllAdvertisements.mockRejectedValue(new Error('Network error'));

    render(<Advertisement />);

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(
        'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.'
      );
    });
  });

  it('filters ads when the filter is applied', async () => {
    const mockFilteredAds = [
      {
        adpageid: '3',
        full_name: 'Sam Smith',
        title: 'Filtered Ad',
        address: 'Filtered Location',
        pet: 'Yes',
        smoking: 'No',
        price: 1500,
        photos: ['filteredImage.jpg'],
      },
    ];

    filterAdvertisements.mockResolvedValue({
      error_status: 200,
      advertisement_list: mockFilteredAds,
    });

    useCompare.mockReturnValue({
      compareAds: [],
      handleCompareChange: jest.fn(),
    });

    useFavorites.mockReturnValue({
      favorites: [],
      handleFavoriteChange: jest.fn(),
    });

    render(<Advertisement />);

    const filterButton = screen.getByText('Filter'); // Adjust this to match your filter button's text
    fireEvent.click(filterButton);

    await waitFor(() => {
      mockFilteredAds.forEach((ad) => {
        expect(screen.getByText(ad.title)).toBeInTheDocument();
      });
    });
  });

  it('handles pagination correctly', async () => {
    const mockAdsPage1 = [
      {
        adpageid: '1',
        full_name: 'John Doe',
        title: 'Page 1 Ad 1',
        address: 'Page 1 Location 1',
        pet: 'Yes',
        smoking: 'No',
        price: 1000,
        photos: ['image1.jpg'],
      },
    ];

    const mockAdsPage2 = [
      {
        adpageid: '2',
        full_name: 'Jane Doe',
        title: 'Page 2 Ad 1',
        address: 'Page 2 Location 1',
        pet: 'No',
        smoking: 'Yes',
        price: 2000,
        photos: ['image2.jpg'],
      },
    ];

    getAllAdvertisements
      .mockResolvedValueOnce({
        error_status: 200,
        advertisement_list: mockAdsPage1,
      })
      .mockResolvedValueOnce({
        error_status: 200,
        advertisement_list: mockAdsPage2,
      });

    render(<Advertisement />);

    await waitFor(() => {
      expect(screen.getByText('Page 1 Ad 1')).toBeInTheDocument();
    });

    const paginationButton = screen.getByText('2');
    fireEvent.click(paginationButton);

    await waitFor(() => {
      expect(screen.getByText('Page 2 Ad 1')).toBeInTheDocument();
    });
  });
});
