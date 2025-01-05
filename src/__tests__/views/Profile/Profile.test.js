import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from './Profile'; // Adjust the import path as needed
import { getUserProfile } from './ProfileApi'; // Mock the API function
import { useRoleColor } from '../../hooks/useRoleColor'; // Mock the role color hook

jest.mock('./ProfileApi');
jest.mock('../../hooks/useRoleColor');

describe('Profile Component', () => {
  const mockUserData = {
    ppurl: 'https://example.com/avatar.jpg',
    full_name: 'John Doe',
    contact: 'john@example.com',
    about: 'This is a brief description about John.',
    date_of_birth: '1990-01-01',
    gender: true,
    smoking: false,
    pet: true,
    department_name: 'Computer Science',
  };

  beforeEach(() => {
    // Mocking the role color hook
    useRoleColor.mockReturnValue('#1890ff');
    // Mocking the API response
    getUserProfile.mockResolvedValue({
      user_info_list: [mockUserData],
    });
  });

  it('should render profile data correctly', async () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    // Check that the loading spinner is displayed initially
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    // Wait for the profile data to load
    expect(await screen.findByText(mockUserData.full_name)).toBeInTheDocument();
    expect(await screen.findByText(mockUserData.contact)).toBeInTheDocument();
    expect(await screen.findByText(mockUserData.about)).toBeInTheDocument();
    expect(await screen.findByText(mockUserData.date_of_birth)).toBeInTheDocument();
    expect(await screen.findByText('Erkek')).toBeInTheDocument(); // Gender is true, so it should say "Erkek"
    expect(await screen.findByText('Hayır')).toBeInTheDocument(); // Smoking is false, so it should say "Hayır"
    expect(await screen.findByText('Evet')).toBeInTheDocument(); // Pet is true, so it should say "Evet"
    expect(await screen.findByText(mockUserData.department_name)).toBeInTheDocument();
  });

  it('should handle loading state', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    // Check that the spinner is shown while loading
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('should handle error when profile data is not available', async () => {
    // Simulate an API error response
    getUserProfile.mockResolvedValue({ user_info_list: [] });

    render(
      <Router>
        <Profile />
      </Router>
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Seni Bulamadık!')).toBeInTheDocument();
    });
  });

  it('should navigate to the edit-profile page when "Profilini Düzenle" is clicked', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    const editButton = screen.getByText('Profilini Düzenle');
    editButton.click();

    // Check that the navigation to the edit-profile page happens
    expect(window.location.pathname).toBe(`/edit-profile/${localStorage.getItem('userId')}`);
  });

  it('should navigate to the change-password page when "Şifre Değiştir" is clicked', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    const changePasswordButton = screen.getByText('Şifre Değiştir');
    changePasswordButton.click();

    // Check that the navigation to the change-password page happens
    expect(window.location.pathname).toBe(`/change-password/${localStorage.getItem('userId')}`);
  });
});
