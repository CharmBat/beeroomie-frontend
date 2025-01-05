import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ConfirmEmail from "./ConfirmEmail"; // Adjust the import based on your file structure
import { sendConfirmEmailRequest } from "./AuthApi"; // Mock the API request

jest.mock("./AuthApi", () => ({
  sendConfirmEmailRequest: jest.fn(),
}));

describe("ConfirmEmail Component", () => {
  it("should show a success message and navigate to login on successful email confirmation", async () => {
    const mockNavigate = jest.fn();
    const token = "sample-token";

    sendConfirmEmailRequest.mockResolvedValueOnce({
      error_status: 200,
      system_message: "Success",
    });

    render(
      <MemoryRouter initialEntries={[`/confirm-email/${token}`]}>
        <Routes>
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(sendConfirmEmailRequest).toHaveBeenCalledWith(token);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    expect(screen.getByText(/Doğrulandı! Giriş yapabilirsiniz./)).toBeInTheDocument();
  });

  it("should show an error message if the API response is not successful", async () => {
    const token = "sample-token";

    sendConfirmEmailRequest.mockResolvedValueOnce({
      error_status: 500,
      system_message: "Something went wrong",
    });

    render(
      <MemoryRouter initialEntries={[`/confirm-email/${token}`]}>
        <Routes>
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(sendConfirmEmailRequest).toHaveBeenCalledWith(token);
    });

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("should handle errors gracefully if the API request fails", async () => {
    const token = "sample-token";

    sendConfirmEmailRequest.mockRejectedValueOnce(new Error("Server error"));

    render(
      <MemoryRouter initialEntries={[`/confirm-email/${token}`]}>
        <Routes>
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(sendConfirmEmailRequest).toHaveBeenCalledWith(token);
    });

    // Since the error is caught, no message will be shown. You can check for console logs if needed.
    expect(console.error).toHaveBeenCalledWith("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
  });
});
