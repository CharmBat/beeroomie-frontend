import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword"; // Adjust the import based on your file structure
import { sendForgotPasswordRequest } from "./AuthApi"; // Mock the API request

jest.mock("./AuthApi", () => ({
  sendForgotPasswordRequest: jest.fn(),
}));

describe("ForgotPassword Component", () => {
  it("should show success message when email is valid and the API responds successfully", async () => {
    const mockEmail = "test@example.com";
    
    sendForgotPasswordRequest.mockResolvedValueOnce({
      data: { error_status: 200, system_message: "Success" },
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/i), { target: { value: mockEmail } });
    fireEvent.click(screen.getByText(/Şifremi Sıfırla/i));

    await waitFor(() => {
      expect(sendForgotPasswordRequest).toHaveBeenCalledWith(mockEmail);
    });

    expect(screen.getByText(/Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!/)).toBeInTheDocument();
  });

  it("should show error message when the email format is incorrect", async () => {
    const invalidEmail = "invalid-email";
    
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/i), { target: { value: invalidEmail } });
    fireEvent.click(screen.getByText(/Şifremi Sıfırla/i));

    await waitFor(() => {
      expect(screen.getByText(/Geçerli bir e-posta girin!/)).toBeInTheDocument();
    });
  });

  it("should show error message when API request fails", async () => {
    const mockEmail = "test@example.com";

    sendForgotPasswordRequest.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/E-posta/i), { target: { value: mockEmail } });
    fireEvent.click(screen.getByText(/Şifremi Sıfırla/i));

    await waitFor(() => {
      expect(screen.getByText(/Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin./)).toBeInTheDocument();
    });
  });

  it("should show an error message when form validation fails", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Şifremi Sıfırla/i));

    await waitFor(() => {
      expect(screen.getByText(/Lütfen e-posta adresinizi girin!/)).toBeInTheDocument();
    });
  });

  it("should navigate to login page when the Login button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Giriş Yap/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });
  });

  it("should navigate to register page when the Register button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Kaydol/i));

    await waitFor(() => {
      expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
    });
  });
});
