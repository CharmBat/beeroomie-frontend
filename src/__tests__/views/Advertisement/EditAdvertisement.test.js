import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditAdvertisement from "./EditAdvertisement";
import * as AdApi from "./AdApi";
import { message } from "antd";

// Mock APIs
jest.mock("./AdApi", () => ({
  getUtilities: jest.fn(),
  getDistricts: jest.fn(),
  getNeighborhoods: jest.fn(),
  getN_rooms: jest.fn(),
  getAdDetail: jest.fn(),
  updateAd: jest.fn(),
}));
jest.mock("../MiscApi", () => ({
  photoUpload: jest.fn(),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("EditAdvertisement Component", () => {
  beforeEach(() => {
    // Mock API responses
    AdApi.getUtilities.mockResolvedValue({
      utilities: [{ utilityid: 1, utility_name: "Wi-Fi" }],
    });
    AdApi.getDistricts.mockResolvedValue({
      districts: [{ districtid: 1, district_name: "Central" }],
    });
    AdApi.getNeighborhoods.mockResolvedValue({
      neighborhoods: [{ neighborhoodid: 1, neighborhood_name: "Downtown" }],
    });
    AdApi.getN_rooms.mockResolvedValue({
      rooms: [{ n_roomid: 1, n_room: "1+1" }],
    });
    AdApi.getAdDetail.mockResolvedValue({
      advertisement_list: [
        {
          districtid_fk: 1,
          photos: ["http://example.com/photo1.png"],
          title: "Test Ad",
          description: "Test Description",
          address: "123 Test Street",
          price: 1000,
          n_roomid_fk: 1,
          n_floor: 5,
          floornumber: 2,
          m2: 50,
          adtype: true,
          furnished: true,
          smoking: false,
          pet: true,
          gender_choices: 2,
          utilities: [1],
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and pre-populates with advertisement details", async () => {
    render(
      <MemoryRouter>
        <EditAdvertisement />
      </MemoryRouter>
    );

    // Wait for the API calls to complete
    await waitFor(() => expect(AdApi.getUtilities).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(AdApi.getDistricts).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(AdApi.getNeighborhoods).toHaveBeenCalled());
    await waitFor(() => expect(AdApi.getAdDetail).toHaveBeenCalled());

    // Verify form fields are populated with advertisement details
    expect(screen.getByPlaceholderText("İlanınıza bir başlık giriniz.")).toHaveValue("Test Ad");
    expect(screen.getByPlaceholderText("İlanınız için bir açıklama giriniz.")).toHaveValue("Test Description");
    expect(screen.getByPlaceholderText("İlanınızın adresini giriniz.")).toHaveValue("123 Test Street");
    expect(screen.getByPlaceholderText("Fiyatınız")).toHaveValue(1000);
    expect(screen.getByPlaceholderText("Büyüklük")).toHaveValue(50);
  });

  it("submits the form with correct data", async () => {
    render(
      <MemoryRouter>
        <EditAdvertisement />
      </MemoryRouter>
    );

    // Wait for the advertisement details to populate
    await screen.findByPlaceholderText("İlanınıza bir başlık giriniz.");

    // Modify form data
    fireEvent.change(screen.getByPlaceholderText("İlanınıza bir başlık giriniz."), { target: { value: "Updated Ad" } });
    fireEvent.change(screen.getByPlaceholderText("İlanınız için bir açıklama giriniz."), { target: { value: "Updated Description" } });
    fireEvent.click(screen.getByText("İlanı Yayınla"));

    // Wait for the update API call
    await waitFor(() => expect(AdApi.updateAd).toHaveBeenCalledTimes(1));

    // Check the payload
    expect(AdApi.updateAd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Updated Ad",
        description: "Updated Description",
        userid_fk: localStorage.getItem("userId"),
        adpageid: localStorage.getItem("userAd"),
      })
    );

    // Success message
    expect(message.success).toHaveBeenCalledWith("İlan başarıyla güncellendi!");
  });

  it("shows an error message if the form submission fails", async () => {
    AdApi.updateAd.mockRejectedValue(new Error("Update failed"));

    render(
      <MemoryRouter>
        <EditAdvertisement />
      </MemoryRouter>
    );

    // Wait for the advertisement details to populate
    await screen.findByPlaceholderText("İlanınıza bir başlık giriniz.");

    // Submit the form
    fireEvent.click(screen.getByText("İlanı Yayınla"));

    // Wait for the error message
    await waitFor(() => expect(message.error).toHaveBeenCalledWith("İlan güncellenemedi. Lütfen tekrar deneyin."));
  });
});
