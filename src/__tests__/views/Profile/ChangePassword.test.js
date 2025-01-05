import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import * as AuthApi from '../Auth/AuthApi'; // Adjust the import path based on your file structure
import { message } from "antd";

// Mock the `sendResetPaswordRequest` function
jest.mock('../Auth/AuthApi', () => ({
  sendResetPaswordRequest: jest.fn(),
}));

// Suppress Ant Design message in the console
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock localStorage for testing
beforeAll(() => {
  global.localStorage.setItem('authToken', 'mocked-token');
  global.localStorage.setItem('userId', 'mocked-user-id');
});

describe("ChangePassword Component", () => {
  it("should render the change password form", () => {
    render(
      <MemoryRouter initialEntries={["/change-password"]}>
        <Routes>
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/Mevcut Şifre/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Yeni Şifre/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/)).toBeInTheDocument();
    expect(screen.getByText(/Değiştir/)).toBeInTheDocument();
    expect(screen.getByText(/Geri Dön/)).toBeInTheDocument();
  });

  it("should call sendResetPaswordRequest and navigate on successful password change", async () => {
    const mockResetResponse = {}; // Simulating a successful response from the API

    // Mock the API function to return a successful response
    AuthApi.sendResetPaswordRequest.mockResolvedValue(mockResetResponse);

    render(
      <MemoryRouter initialEntries={["/change-password"]}>
        <Routes>
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Mevcut Şifre/), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the async operation to complete
    await waitFor(async () => {
      // Check if the success message is shown
      await waitFor(() => {
        expect(message.success).toHaveBeenCalledWith('Şifreniz başarıyla değiştirildi!');
      });

      // Check if navigation occurs (simulate navigating to the profile page)
      await waitFor(() => {
        expect(window.location.pathname).toBe('/profile/mocked-user-id');
      });
    });
  });

  it("should show an error message when password change fails", async () => {
    const mockErrorResponse = new Error("Network error");

    // Mock the API function to simulate a network error
    AuthApi.sendResetPaswordRequest.mockRejectedValue(mockErrorResponse);

    render(
      <MemoryRouter initialEntries={["/change-password"]}>
        <Routes>
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Mevcut Şifre/), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.');
    });
  });

  it("should show an error message if passwords don't match", async () => {
    render(
      <MemoryRouter initialEntries={["/change-password"]}>
        <Routes>
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Mevcut Şifre/), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword456" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the error message for password mismatch
    await waitFor(() => {
      expect(screen.getByText("Şifreler eşleşmiyor!")).toBeInTheDocument();
    });
  });

  it("should navigate back when the 'Geri Dön' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/change-password"]}>
        <Routes>
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Geri Dön/));

    // Check if the previous route is navigated to
    expect(window.history.length).toBe(1); // The history stack length after going back
  });
});
