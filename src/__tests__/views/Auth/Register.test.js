import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import * as AuthApi from "./AuthApi"; // Adjust the import path based on your file structure
import { message } from "antd";

// Mock the `sendRegisterRequest` function
jest.mock("./AuthApi", () => ({
  sendRegisterRequest: jest.fn(),
}));

// Suppress Ant Design message in the console
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Register Component", () => {
  it("should render the registration form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/E-posta/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Şifre/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Şifreyi Onayla/)).toBeInTheDocument();
    expect(screen.getByText(/Kaydol/)).toBeInTheDocument();
    expect(screen.getByText(/Giriş Yap/)).toBeInTheDocument();
    expect(screen.getByText(/Şifremi Unuttum/)).toBeInTheDocument();
  });

  it("should call sendRegisterRequest and navigate on successful registration", async () => {
    const mockRegisterResponse = {
      error_status: 201,
    };

    // Mock the API function to return a successful response
    AuthApi.sendRegisterRequest.mockResolvedValue(mockRegisterResponse);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@itu.edu.tr" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifreyi Onayla/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Kaydol/));

    // Wait for the async operation to complete
    await waitFor(() => {
      // Check if the success message is shown
      expect(message.success).toHaveBeenCalledWith(
        "Kayıt başarılı! Lütfen mailinizi kontrol edin."
      );
    });

    await waitFor(() => {
      // Check if navigation occurs (simulate navigating to login page)
      expect(window.location.pathname).toBe("/login");
    });
  });

  it("should show an error message when registration fails", async () => {
    const mockRegisterResponse = {
      error_status: 400,
      system_message: "E-posta zaten kullanımda",
    };

    // Mock the API function to return a failed response
    AuthApi.sendRegisterRequest.mockResolvedValue(mockRegisterResponse);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@itu.edu.tr" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifreyi Onayla/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Kaydol/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("E-posta zaten kullanımda");
    });
  });

  it("should show an error message if the API call fails", async () => {
    const mockErrorResponse = new Error("Network error");

    // Mock the API function to simulate a network error
    AuthApi.sendRegisterRequest.mockRejectedValue(mockErrorResponse);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@itu.edu.tr" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifreyi Onayla/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Kaydol/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith(
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin."
      );
    });
  });

  it("should show an error message if email is invalid", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifreyi Onayla/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Kaydol/));

    // Wait for the error message for email validation
    await waitFor(() => {
      expect(screen.getByText("Lütfen İTÜ mail adresinizi giriniz!")).toBeInTheDocument();
    });
  });

  it("should show an error message if passwords don't match", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@itu.edu.tr" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifreyi Onayla/), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByText(/Kaydol/));

    // Wait for the error message for password mismatch
    await waitFor(() => {
      expect(screen.getByText("Şifreler eşleşmiyor!")).toBeInTheDocument();
    });
  });
});
