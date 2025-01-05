import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OfferPage from "./OfferPage";
import { getOffers, withdrawOffer } from "./AdApi";
import { message } from "antd";

// Mock the API functions
jest.mock("./AdApi", () => ({
  getOffers: jest.fn(),
  withdrawOffer: jest.fn(),
}));

jest.mock("antd", () => {
  const originalModule = jest.requireActual("antd");
  return {
    ...originalModule,
    message: {
      error: jest.fn(),
      success: jest.fn(),
    },
  };
});

describe("OfferPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders offers by you when role is Roomie", async () => {
    // Mock localStorage
    localStorage.setItem("userRole", "Roomie");

    // Mock API response
    getOffers.mockResolvedValueOnce({
      offers: [
        { offer_id: 1, title: "Offer 1", description: "Description 1" },
        { offer_id: 2, title: "Offer 2", description: "Description 2" },
      ],
    });

    render(<OfferPage />);

    // Wait for the offers to load
    await waitFor(() => {
      expect(getOffers).toHaveBeenCalled();
    });

    // Check if the title is rendered
    expect(screen.getByText("Senin Tekliflerin")).toBeInTheDocument();

    // Check if offers are rendered
    expect(screen.getByText("Offer 1")).toBeInTheDocument();
    expect(screen.getByText("Offer 2")).toBeInTheDocument();
  });

  it("renders incoming offers when role is Housie", async () => {
    // Mock localStorage
    localStorage.setItem("userRole", "Housie");

    // Mock API response
    getOffers.mockResolvedValueOnce({
      offers: [
        { offer_id: 3, title: "Offer 3", description: "Description 3" },
        { offer_id: 4, title: "Offer 4", description: "Description 4" },
      ],
    });

    render(<OfferPage />);

    // Wait for the offers to load
    await waitFor(() => {
      expect(getOffers).toHaveBeenCalled();
    });

    // Check if the title is rendered
    expect(screen.getByText("Gelen Teklifler")).toBeInTheDocument();

    // Check if offers are rendered
    expect(screen.getByText("Offer 3")).toBeInTheDocument();
    expect(screen.getByText("Offer 4")).toBeInTheDocument();
  });

  it("shows success message when withdrawing an offer", async () => {
    // Mock localStorage
    localStorage.setItem("userRole", "Roomie");

    // Mock API response
    getOffers.mockResolvedValueOnce({
      offers: [
        { offer_id: 1, title: "Offer 1", description: "Description 1" },
      ],
    });

    withdrawOffer.mockResolvedValueOnce();

    render(<OfferPage />);

    // Wait for the offers to load
    await waitFor(() => {
      expect(getOffers).toHaveBeenCalled();
    });

    const withdrawButton = screen.getByRole("button", { name: /withdraw/i });

    userEvent.click(withdrawButton);

    await waitFor(() => {
      expect(withdrawOffer).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith(
        "Teklif başarıyla geri çekildi."
      );
    });
  });

  it("shows error message when fetching offers fails", async () => {
    // Mock API error
    getOffers.mockRejectedValueOnce(new Error("API Error"));

    render(<OfferPage />);

    await waitFor(() => {
      expect(getOffers).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        message.error
      ).toHaveBeenCalledWith("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    });
  });

  it("shows error message when withdrawing an offer fails", async () => {
    // Mock localStorage
    localStorage.setItem("userRole", "Roomie");

    // Mock API response
    getOffers.mockResolvedValueOnce({
      offers: [
        { offer_id: 1, title: "Offer 1", description: "Description 1" },
      ],
    });

    withdrawOffer.mockRejectedValueOnce(new Error("API Error"));

    render(<OfferPage />);

    // Wait for the offers to load
    await waitFor(() => {
      expect(getOffers).toHaveBeenCalled();
    });

    const withdrawButton = screen.getByRole("button", { name: /withdraw/i });

    userEvent.click(withdrawButton);

    await waitFor(() => {
      expect(withdrawOffer).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(
        message.error
      ).toHaveBeenCalledWith("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    });
  });
});
