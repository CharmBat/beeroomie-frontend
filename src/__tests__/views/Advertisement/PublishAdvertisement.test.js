import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PublishAdvertisement from "./PublishAdvertisement";
import {
  getDistricts,
  getN_rooms,
  getUtilities,
  publishAd,
} from "./AdApi";
import { photoUpload } from "../MiscApi";

jest.mock("./AdApi", () => ({
  getDistricts: jest.fn(),
  getN_rooms: jest.fn(),
  getNeighborhoods: jest.fn(),
  getUtilities: jest.fn(),
  publishAd: jest.fn(),
}));

jest.mock("../MiscApi", () => ({
  photoUpload: jest.fn(),
}));

describe("PublishAdvertisement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields and submit button", async () => {
    getDistricts.mockResolvedValue({ districts: [] });
    getUtilities.mockResolvedValue({ utilities: [] });
    getN_rooms.mockResolvedValue({ rooms: [] });

    render(
      <Router>
        <PublishAdvertisement />
      </Router>
    );

    expect(screen.getByLabelText(/Başlık/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Açıklama/i)).toBeInTheDocument();
    expect(screen.getByText(/İlanı Yayınla/i)).toBeInTheDocument();
  });

  test("fetches districts, utilities, and room data on mount", async () => {
    getDistricts.mockResolvedValue({ districts: [{ districtid: 1, district_name: "District 1" }] });
    getUtilities.mockResolvedValue({ utilities: [{ utilityid: 1, utility_name: "Utility 1" }] });
    getN_rooms.mockResolvedValue({ rooms: [{ n_roomid: 1, n_room: "1+1" }] });

    render(
      <Router>
        <PublishAdvertisement />
      </Router>
    );

    await waitFor(() => expect(getDistricts).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getUtilities).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getN_rooms).toHaveBeenCalledTimes(1));
  });

  test("submits form data successfully", async () => {
    getDistricts.mockResolvedValue({ districts: [{ districtid: 1, district_name: "District 1" }] });
    getUtilities.mockResolvedValue({ utilities: [{ utilityid: 1, utility_name: "Utility 1" }] });
    getN_rooms.mockResolvedValue({ rooms: [{ n_roomid: 1, n_room: "1+1" }] });
    publishAd.mockResolvedValue({ error_status: 201, user_message: "Advertisement 1 created successfully" });

    render(
      <Router>
        <PublishAdvertisement />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Başlık/i), { target: { value: "Test Ad" } });
    fireEvent.change(screen.getByLabelText(/Açıklama/i), { target: { value: "Test Description" } });
    fireEvent.change(screen.getByLabelText(/İlçe/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Mahalle/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Ev Adresi/i), { target: { value: "Test Address" } });
    fireEvent.change(screen.getByLabelText(/Fiyatınız nedir?/i), { target: { value: 500 } });

    fireEvent.click(screen.getByRole("button", { name: /İlanı Yayınla/i }));

    await waitFor(() => {
      expect(publishAd).toHaveBeenCalledWith(expect.objectContaining({
        title: "Test Ad",
        description: "Test Description",
        district: 1,
        neighborhoodid_fk: 1,
        address: "Test Address",
        price: 500,
      }));
    });
  });

  test("handles photo upload", async () => {
    const mockFile = new File(["dummy content"], "test.jpg", { type: "image/jpeg" });
    photoUpload.mockResolvedValue("http://example.com/test.jpg");

    render(
      <Router>
        <PublishAdvertisement />
      </Router>
    );

    const fileInput = screen.getByLabelText(/Fotoğraf Yükle/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => expect(photoUpload).toHaveBeenCalledWith(mockFile));
    expect(await screen.findByAltText("test.jpg")).toBeInTheDocument();
  });
});
