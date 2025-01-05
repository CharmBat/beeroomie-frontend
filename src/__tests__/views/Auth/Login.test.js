import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import * as AuthApi from "./AuthApi"; // Adjust the import path based on your file structure
import { message } from "antd";

// Mock the `sendLoginRequest` and `userMe` functions
jest.mock("./AuthApi", () => ({
  sendLoginRequest: jest.fn(),
  userMe: jest.fn(),
}));

// Mock localStorage
global.localStorage = {
  setItem: jest.fn(),
};

// Suppress Ant Design message in the console
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login Component", () => {
  it("should render the login form", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={jest.fn()} />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/E-posta/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Şifre/)).toBeInTheDocument();
    expect(screen.getByText(/Giriş Yap/)).toBeInTheDocument();
    expect(screen.getByText(/Kaydol/)).toBeInTheDocument();
    expect(screen.getByText(/Şifremi Unuttum/)).toBeInTheDocument();
  });

  it("should call sendLoginRequest and navigate on successful login", async () => {
    const setIsLoggedIn = jest.fn();
    const mockLoginResponse = {
      error_status: 200,
      access_token: "fake_token",
    };
    const mockUserInfo = {
      user: {
        userid: 1,
        full_name: "Test User",
        ppurl: "fake_url",
        role: true,
        rh: false,
        adv_id: 123,
      },
    };

    // Mock the API functions to return successful responses
    AuthApi.sendLoginRequest.mockResolvedValue(mockLoginResponse);
    AuthApi.userMe.mockResolvedValue(mockUserInfo);

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Giriş Yap/));

    // Wait for the async operation to complete
    await waitFor(() => expect(message.success).toHaveBeenCalledWith("Giriş başarılı!"));

    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("authToken", "fake_token"));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("userId", 1));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("userName", "Test User"));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("userPic", "fake_url"));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("userRole", "Admin"));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith("userAd", 123));

    await waitFor(() => expect(setIsLoggedIn).toHaveBeenCalledWith(true));
  });

  it("should show an error message when login fails", async () => {
    const setIsLoggedIn = jest.fn();
    const mockLoginResponse = {
      error_status: 400,
      system_message: "Invalid credentials",
    };

    // Mock the API function to return a failed response
    AuthApi.sendLoginRequest.mockResolvedValue(mockLoginResponse);

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText(/Giriş Yap/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("should show an error message if the API call fails", async () => {
    const setIsLoggedIn = jest.fn();

    // Mock the API function to simulate a network error
    AuthApi.sendLoginRequest.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Şifre/), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Giriş Yap/));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
    });
  });
});
