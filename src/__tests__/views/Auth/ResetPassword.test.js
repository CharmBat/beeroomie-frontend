import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import * as AuthApi from "./AuthApi"; // Adjust the import path based on your file structure
import { message } from "antd";

// Mock the `sendResetPaswordRequest` function
jest.mock("./AuthApi", () => ({
  sendResetPaswordRequest: jest.fn(),
}));

// Suppress Ant Design message in the console
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ResetPassword Component", () => {
  it("should render the reset password form", () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/123456"]}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/Yeni Şifre/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/)).toBeInTheDocument();
    expect(screen.getByText(/Değiştir/)).toBeInTheDocument();
  });

  it("should call sendResetPaswordRequest and navigate on successful password reset", async () => {
    const mockResetResponse = {
      error_status: 200,
    };

    // Mock the API function to return a successful response
    AuthApi.sendResetPaswordRequest.mockResolvedValue(mockResetResponse);

    render(
      <MemoryRouter initialEntries={["/reset-password/123456"]}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the async operation to complete
    await waitFor(() => {
      // Check if the success message is shown
      expect(message.success).toHaveBeenCalledWith("Şifreniz başarıyla değiştirildi!");
    });

    await waitFor(() => {
      // Check if navigation occurs (simulate navigating to the homepage)
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should show an error message when password reset fails", async () => {
    const mockResetResponse = {
      error_status: 400,
      system_message: "Geçersiz token",
    };

    // Mock the API function to return a failed response
    AuthApi.sendResetPaswordRequest.mockResolvedValue(mockResetResponse);

    render(
      <MemoryRouter initialEntries={["/reset-password/123456"]}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Geçersiz token");
    });
  });

  it("should show an error message if the API call fails", async () => {
    const mockErrorResponse = new Error("Network error");

    // Mock the API function to simulate a network error
    AuthApi.sendResetPaswordRequest.mockRejectedValue(mockErrorResponse);

    render(
      <MemoryRouter initialEntries={["/reset-password/123456"]}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifre/), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Yeni Şifreyi Onayla/), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByText(/Değiştir/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin."
      );
    });
  });

  it("should show an error message if passwords don't match", async () => {
    render(
      <MemoryRouter initialEntries={["/reset-password/123456"]}>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

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
});
