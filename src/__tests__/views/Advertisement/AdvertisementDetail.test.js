import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import AdDetail from "./AdDetail";
import { getAdDetail, removeAd } from "./AdApi";
import { message } from "antd";

// Mock API functions
jest.mock("./AdApi", () => ({
  getAdDetail: jest.fn(),
  removeAd: jest.fn(),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("AdDetail Component", () => {
  const mockAdData = {
    error_status: 200,
    advertisement_list: [
      {
        adpageid: "1",
        title: "Beautiful Room",
        photos: ["/image1.jpg", "/image2.jpg"],
        description: "Spacious room with great lighting.",
        address: "123 Main St",
        neighborhood: "Downtown",
        district: "City Center",
        user_full_name: "John Doe",
        userid_fk: "123",
        price: "1500",
        adType: true,
        ad_date: "2025-01-01",
        furnished: true,
        gender_choices: 2,
        m2: 45,
        n_room: 1,
        n_floor: 5,
        floornumber: 2,
        smoking: false,
        pet: true,
      },
    ],
  };

  beforeEach(() => {
    localStorage.setItem("userAd", "1");
    localStorage.setItem("userPic", "/user.jpg");
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/ad-detail/1"]}>
        <Route path="/ad-detail/:adId">
          <AdDetail />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders ad details correctly", async () => {
    getAdDetail.mockResolvedValue(mockAdData);

    render(
      <MemoryRouter initialEntries={["/ad-detail/1"]}>
        <Route path="/ad-detail/:adId">
          <AdDetail />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText("Beautiful Room")).toBeInTheDocument();
    expect(screen.getByText("1500 ₺")).toBeInTheDocument();
    expect(screen.getByText("Spacious room with great lighting.")).toBeInTheDocument();
    expect(screen.getByAltText("User Avatar")).toHaveAttribute("src", "/user.jpg");
  });

  test("handles API errors gracefully", async () => {
    getAdDetail.mockRejectedValue(new Error("Network Error"));

    render(
      <MemoryRouter initialEntries={["/ad-detail/1"]}>
        <Route path="/ad-detail/:adId">
          <AdDetail />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(message.error).toHaveBeenCalledWith(
        "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin."
      )
    );
  });

  test("opens and closes the report modal", async () => {
    getAdDetail.mockResolvedValue(mockAdData);

    render(
      <MemoryRouter initialEntries={["/ad-detail/1"]}>
        <Route path="/ad-detail/:adId">
          <AdDetail />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText("Beautiful Room")).toBeInTheDocument();
    const reportButton = screen.getByText("Kullanıcıyı Raporla");
    fireEvent.click(reportButton);

    expect(screen.getByText("Report User")).toBeInTheDocument(); // Replace with the actual content in ReportModal
    const closeButton = screen.getByText("Close"); // Replace with actual close button text
    fireEvent.click(closeButton);

    expect(screen.queryByText("Report User")).not.toBeInTheDocument();
  });

  test("removes ad on user confirmation", async () => {
    getAdDetail.mockResolvedValue(mockAdData);
    removeAd.mockResolvedValue({ error_status: 200 });

    render(
      <MemoryRouter initialEntries={["/ad-detail/1"]}>
        <Route path="/ad-detail/:adId">
          <AdDetail />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText("Beautiful Room")).toBeInTheDocument();
    const removeButton = screen.getByText("İlanı Kaldır");
    fireEvent.click(removeButton);

    await waitFor(() => expect(message.success).toHaveBeenCalledWith("İlan başarıyla kaldırıldı."));
    expect(localStorage.getItem("userAd")).toBeNull();
  });
});
