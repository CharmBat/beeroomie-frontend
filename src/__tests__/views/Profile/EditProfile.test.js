import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from './EditProfile';
import { getUserProfile, updateUserProfile, department, photoUpload } from './ProfileApi';
import { useRoleColor } from '../../hooks/useRoleColor';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking API calls and hooks
jest.mock('./ProfileApi', () => ({
  getUserProfile: jest.fn(),
  updateUserProfile: jest.fn(),
  department: jest.fn(),
  photoUpload: jest.fn(),
}));

jest.mock('../../hooks/useRoleColor', () => ({
  useRoleColor: jest.fn(),
}));

describe('EditProfile', () => {
  const userId = '123';
  const mockRoleColor = 'blue';
  
  beforeEach(() => {
    // Reset the mocks before each test
    getUserProfile.mockReset();
    updateUserProfile.mockReset();
    department.mockReset();
    photoUpload.mockReset();
    useRoleColor.mockReturnValue(mockRoleColor);
    localStorage.setItem('userId', userId);
  });

  test('renders the profile form and pre-populates data', async () => {
    // Mock API responses
    getUserProfile.mockResolvedValue({
      user_info_list: [{
        full_name: 'John Doe',
        date_of_birth: '1990-01-01',
        gender: true,
        smoking: false,
        pet: true,
        contact: 'john.doe@example.com',
        departmentid_fk: 1,
        about: 'This is about me.',
        ppurl: '/path/to/avatar.jpg',
      }],
    });

    department.mockResolvedValue([{ departmentid: 1, department_name: 'Computer Science' }]);

    render(
      <Router>
        <EditProfile />
      </Router>
    );

    // Wait for the API calls to resolve
    await screen.findByText('Kaydet');

    // Check that the form fields are populated correctly
    expect(screen.getByLabelText('İsmin')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Doğum Tarihin')).toHaveValue('1990-01-01');
    expect(screen.getByLabelText('Cinsiyetin')).toHaveValue(true);
    expect(screen.getByLabelText('Sigara Kullanımı')).toHaveValue(false);
    expect(screen.getByLabelText('Evcil Hayvan')).toHaveValue(true);
    expect(screen.getByLabelText('İletişim Bilgilerin')).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText('Fakülte')).toHaveValue(1);
    expect(screen.getByLabelText('Hakkımda')).toHaveValue('This is about me.');
  });

  test('submits the form with updated data', async () => {
    // Mock API responses
    getUserProfile.mockResolvedValue({
      user_info_list: [{
        full_name: 'John Doe',
        date_of_birth: '1990-01-01',
        gender: true,
        smoking: false,
        pet: true,
        contact: 'john.doe@example.com',
        departmentid_fk: 1,
        about: 'This is about me.',
        ppurl: '/path/to/avatar.jpg',
      }],
    });

    department.mockResolvedValue([{ departmentid: 1, department_name: 'Computer Science' }]);
    updateUserProfile.mockResolvedValue({});

    render(
      <Router>
        <EditProfile />
      </Router>
    );

    await screen.findByText('Kaydet');

    const saveButton = screen.getByText('Kaydet');
    
    fireEvent.click(saveButton);

    // Assert that the API call to updateUserProfile was called
    await waitFor(() => {
      expect(updateUserProfile).toHaveBeenCalledWith(userId, expect.objectContaining({
        full_name: 'John Doe',
        date_of_birth: '1990-01-01',
        gender: true,
        smoking: false,
        pet: true,
        contact: 'john.doe@example.com',
        departmentid_fk: 1,
        about: 'This is about me.',
        ppurl: '/path/to/avatar.jpg',
      }));
    });
  });

  test('displays a loading spinner while fetching data', async () => {
    // Simulate a loading state
    getUserProfile.mockResolvedValueOnce({ user_info_list: [] });
    department.mockResolvedValueOnce([]);

    render(
      <Router>
        <EditProfile />
      </Router>
    );

    // Assert that the spinner is shown
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('handles avatar change and uploads new image', async () => {
    // Mock file upload response
    photoUpload.mockResolvedValue('/path/to/new-avatar.jpg');

    getUserProfile.mockResolvedValue({
      user_info_list: [{
        full_name: 'John Doe',
        date_of_birth: '1990-01-01',
        gender: true,
        smoking: false,
        pet: true,
        contact: 'john.doe@example.com',
        departmentid_fk: 1,
        about: 'This is about me.',
        ppurl: '/path/to/avatar.jpg',
      }],
    });

    department.mockResolvedValue([{ departmentid: 1, department_name: 'Computer Science' }]);

    render(
      <Router>
        <EditProfile />
      </Router>
    );

    const avatarChangeButton = screen.getByText('Fotoğraf Değiştir');
    
    // Simulate file selection and change
    fireEvent.click(avatarChangeButton);

    await waitFor(() => expect(photoUpload).toHaveBeenCalled());

    // Assert the avatar has been updated
    expect(screen.getByRole('img').src).toContain('/path/to/new-avatar.jpg');
  });

  test('displays error message when photo upload fails', async () => {
    photoUpload.mockRejectedValue(new Error('Upload failed'));
    
    getUserProfile.mockResolvedValue({
      user_info_list: [{
        full_name: 'John Doe',
        date_of_birth: '1990-01-01',
        gender: true,
        smoking: false,
        pet: true,
        contact: 'john.doe@example.com',
        departmentid_fk: 1,
        about: 'This is about me.',
        ppurl: '/path/to/avatar.jpg',
      }],
    });

    department.mockResolvedValue([{ departmentid: 1, department_name: 'Computer Science' }]);

    render(
      <Router>
        <EditProfile />
      </Router>
    );

    const avatarChangeButton = screen.getByText('Fotoğraf Değiştir');
    
    // Simulate file selection and failure
    fireEvent.click(avatarChangeButton);

    await waitFor(() => expect(photoUpload).toHaveBeenCalled());
    
    // Assert the error message is displayed
    expect(screen.getByText('Fotoğraf yüklenemedi. Lütfen tekrar deneyin.')).toBeInTheDocument();
  });
});
