import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminPanel } from './AdminPanel'; // Adjust import path accordingly
import { getReportedUsers, deleteReport, banUser } from './MiscApi'; // Mock these functions

// Mock the API calls
jest.mock('./MiscApi', () => ({
  getReportedUsers: jest.fn(),
  deleteReport: jest.fn(),
  banUser: jest.fn(),
}));

describe('AdminPanel Component', () => {
  const mockReports = [
    {
      report_id: 1,
      reporter: 'John Doe',
      reportee: 'Jane Smith',
      description: 'Inappropriate behavior',
      report_date: '2024-01-01',
      reportee_id: 'user2',
    },
    {
      report_id: 2,
      reporter: 'Alice Cooper',
      reportee: 'Bob Marley',
      description: 'Spamming',
      report_date: '2024-01-02',
      reportee_id: 'user3',
    },
  ];

  beforeEach(() => {
    // Mock the API response
    getReportedUsers.mockResolvedValue(mockReports);
    deleteReport.mockResolvedValue({});
    banUser.mockResolvedValue({});
  });

  it('should render reported users table with data', async () => {
    render(<AdminPanel />);

    // Wait for the table data to load
    // Check if the report data is correctly displayed in the table
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
    expect(await screen.findByText('Inappropriate behavior')).toBeInTheDocument();
    expect(await screen.findByText('2024-01-01')).toBeInTheDocument();
  });

  it('should call deleteReport and remove the report after declining', async () => {
    render(<AdminPanel />);

    const declineButton = screen.getAllByText('Reddet')[0];
    fireEvent.click(declineButton);

    // Check if deleteReport API is called
    await waitFor(() => {
      expect(deleteReport).toHaveBeenCalledWith(1); // report_id of first report
    });

    // Check if the report is removed from the table
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('should call banUser and remove the report after banning a user', async () => {
    render(<AdminPanel />);

    const banButton = screen.getAllByText('Kullanıcıyı Engelle')[0];
    fireEvent.click(banButton);

    // Check if banUser API is called
    await waitFor(() => {
      expect(banUser).toHaveBeenCalledWith('user2'); // reportee_id of first report
    });

    // After banning, check if deleteReport is called to remove the report
    await waitFor(() => {
      expect(deleteReport).toHaveBeenCalledWith(1); // report_id of first report
    });

    // Check if the report is removed from the table
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('should handle error when fetching reported users', async () => {
    getReportedUsers.mockRejectedValueOnce(new Error('Error fetching data'));

    render(<AdminPanel />);

    // Check for the error message
    await waitFor(() => {
      expect(screen.getByText('Raporlar yüklenirken bir hata oluştu.')).toBeInTheDocument();
    });
  });

  it('should handle error when deleting a report', async () => {
    deleteReport.mockRejectedValueOnce(new Error('Error deleting report'));

    render(<AdminPanel />);

    const declineButton = screen.getAllByText('Reddet')[0];
    fireEvent.click(declineButton);

    // Check for the error message
    await waitFor(() => {
      expect(screen.getByText('Rapor silinirken bir hata oluştu.')).toBeInTheDocument();
    });
  });

  it('should handle error when banning a user', async () => {
    banUser.mockRejectedValueOnce(new Error('Error banning user'));

    render(<AdminPanel />);

    const banButton = screen.getAllByText('Kullanıcıyı Engelle')[0];
    fireEvent.click(banButton);

    // Check for the error message
    await waitFor(() => {
      expect(screen.getByText('Kullanıcı engellenirken bir hata oluştu.')).toBeInTheDocument();
    });
  });
});
