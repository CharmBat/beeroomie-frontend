import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewUser from './NewUser';
import { createUserProfile, department } from './ProfileApi';
import { photoUpload } from '../MiscApi';
import { sendLogoutRequest } from '../Auth/AuthApi';

// Mocking necessary API functions
jest.mock('./ProfileApi', () => ({
  createUserProfile: jest.fn(),
  department: jest.fn(),
}));

jest.mock('../MiscApi', () => ({
  photoUpload: jest.fn(),
}));

jest.mock('../Auth/AuthApi', () => ({
  sendLogoutRequest: jest.fn(),
}));

describe('NewUser Component', () => {
  beforeEach(() => {
    // Set initial state for localStorage
    localStorage.setItem('authToken', 'mockToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and shows a loading spinner initially', async () => {
    department.mockResolvedValue([{ department_name: 'Computer Science', departmentid: 1 }]);

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    // Check for the loading spinner
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    await screen.findByText('Kaydet ve Devam Et');
  });

  it('loads departments correctly', async () => {
    department.mockResolvedValue([
      { department_name: 'Computer Science', departmentid: 1 },
      { department_name: 'Electrical Engineering', departmentid: 2 },
    ]);

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    // Wait for departments to load
    await screen.findByText('Kaydet ve Devam Et');

    const departmentSelect = screen.getByPlaceholderText('Fakülte Seçiniz');
    expect(departmentSelect).toBeInTheDocument();

    // Check if the departments are listed in the select input
    expect(departmentSelect).toHaveTextContent('Computer Science');
    expect(departmentSelect).toHaveTextContent('Electrical Engineering');
  });

  it('handles form submission correctly', async () => {
    department.mockResolvedValue([{ department_name: 'Computer Science', departmentid: 1 }]);

    createUserProfile.mockResolvedValue({}); // Mock successful user profile creation

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    const fullNameInput = screen.getByPlaceholderText('Lütfen tam adını gir.');
    const aboutInput = screen.getByPlaceholderText('Senin alanın.');
    const contactInput = screen.getByPlaceholderText('İnsanlar sana nasıl ulaşsın');
    const submitButton = screen.getByText('Kaydet ve Devam Et');

    // Simulate user filling out the form
    userEvent.type(fullNameInput, 'John Doe');
    userEvent.type(aboutInput, 'Software developer');
    userEvent.type(contactInput, 'johndoe@example.com');

    userEvent.click(submitButton);

    // Wait for API call to finish
    await waitFor(() => expect(createUserProfile).toHaveBeenCalledTimes(1));
    expect(createUserProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        full_name: 'John Doe',
        about: 'Software developer',
        contact: 'johndoe@example.com',
        ppurl: 'http://localhost/blankAvatar.svg', // default avatar
      })
    );
  });

  it('handles avatar upload correctly', async () => {
    photoUpload.mockResolvedValue('http://localhost/newAvatar.jpg'); // Mock a successful upload

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    const uploadButton = screen.getByText('Fotoğraf Yükle');
    fireEvent.change(uploadButton, {
      target: { files: [new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' })] },
    });

    await waitFor(() => expect(photoUpload).toHaveBeenCalledTimes(1));
    expect(photoUpload).toHaveBeenCalledWith(expect.any(File));
    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'http://localhost/newAvatar.jpg');
  });

  it('logs out the user after successful profile creation', async () => {
    department.mockResolvedValue([{ department_name: 'Computer Science', departmentid: 1 }]);
    createUserProfile.mockResolvedValue({});
    sendLogoutRequest.mockResolvedValue({});

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    const fullNameInput = screen.getByPlaceholderText('Lütfen tam adını gir.');
    const aboutInput = screen.getByPlaceholderText('Senin alanın.');
    const contactInput = screen.getByPlaceholderText('İnsanlar sana nasıl ulaşsın');
    const submitButton = screen.getByText('Kaydet ve Devam Et');

    userEvent.type(fullNameInput, 'John Doe');
    userEvent.type(aboutInput, 'Software developer');
    userEvent.type(contactInput, 'johndoe@example.com');

    userEvent.click(submitButton);

    await waitFor(() => expect(sendLogoutRequest).toHaveBeenCalledTimes(1));
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('shows error message on form submission failure', async () => {
    department.mockResolvedValue([{ department_name: 'Computer Science', departmentid: 1 }]);
    createUserProfile.mockRejectedValue(new Error('Error'));

    render(<NewUser setIsLoggedIn={jest.fn()} />);

    const fullNameInput = screen.getByPlaceholderText('Lütfen tam adını gir.');
    const aboutInput = screen.getByPlaceholderText('Senin alanın.');
    const contactInput = screen.getByPlaceholderText('İnsanlar sana nasıl ulaşsın');
    const submitButton = screen.getByText('Kaydet ve Devam Et');

    userEvent.type(fullNameInput, 'John Doe');
    userEvent.type(aboutInput, 'Software developer');
    userEvent.type(contactInput, 'johndoe@example.com');

    userEvent.click(submitButton);

    await screen.findByText('Bir Sorun oluştu :('); // Expect error message
  });
});
