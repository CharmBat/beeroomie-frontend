import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing"; // Adjust the import based on your file structure

describe("Landing Component", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    // Check that the welcome message is rendered
    expect(screen.getByText(/Hoşgeldiniz!/)).toBeInTheDocument();

    // Check that both buttons are rendered
    expect(screen.getByText(/Giriş Yap/)).toBeInTheDocument();
    expect(screen.getByText(/Kaydol/)).toBeInTheDocument();
  });

  it("should navigate to the login page when the 'Giriş Yap' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Giriş Yap/));

    // Check that the user is redirected to the login page
    expect(screen.getByText(/Login Page/)).toBeInTheDocument();
  });

  it("should navigate to the register page when the 'Kaydol' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Kaydol/));

    // Check that the user is redirected to the register page
    expect(screen.getByText(/Register Page/)).toBeInTheDocument();
  });
});
