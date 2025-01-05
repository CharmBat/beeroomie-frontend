import { render, screen, fireEvent } from "@testing-library/react";
import Compare from "./Compare";
import { getAdById } from "../Advertisement/AdApi";

jest.mock("../Advertisement/AdApi", () => ({
  getAdById: jest.fn(),
}));

describe("Compare Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders loading spinner while fetching ads", async () => {
    localStorage.setItem("compareAds", JSON.stringify(["1", "2"]));
    getAdById.mockResolvedValueOnce({ advertisement_list: [{}] });

    render(<Compare />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders empty state when no ads are in localStorage", async () => {
    render(<Compare />);


    expect(screen.getByText(/Karşılaştırılacak 2 ilan seçmek için/)).toBeInTheDocument();
  });

  test("renders table with one ad when only one ad is stored", async () => {
    localStorage.setItem("compareAds", JSON.stringify(["1"]));

    getAdById.mockResolvedValueOnce({
      advertisement_list: [
        {
          title: "Ad Title 1",
          photos: ["photo1.jpg"],
          user_full_name: "User 1",
          address: "Address 1",
          district: "District 1",
          neighborhood: "Neighborhood 1",
          price: 1000,
          gender_choices: "Any",
          n_room: 3,
          n_floor: 2,
          m2: 120,
          furnished: true,
          pet: false,
          smoking: true,
          utilities: ["Utility 1", "Utility 2"],
        },
      ],
    });

    render(<Compare />);

    expect(screen.getByText("Ad Title 1")).toBeInTheDocument();
    expect(screen.getByText("120 m²")).toBeInTheDocument();
  });

  test("renders table with two ads when two ads are stored", async () => {
    localStorage.setItem("compareAds", JSON.stringify(["1", "2"]));

    getAdById.mockResolvedValueOnce({
      advertisement_list: [
        {
          title: "Ad Title 1",
          photos: ["photo1.jpg"],
          user_full_name: "User 1",
          address: "Address 1",
          district: "District 1",
          neighborhood: "Neighborhood 1",
          price: 1000,
          gender_choices: "Any",
          n_room: 3,
          n_floor: 2,
          m2: 120,
          furnished: true,
          pet: false,
          smoking: true,
          utilities: ["Utility 1", "Utility 2"],
        },
      ],
    });

    getAdById.mockResolvedValueOnce({
      advertisement_list: [
        {
          title: "Ad Title 2",
          photos: ["photo2.jpg"],
          user_full_name: "User 2",
          address: "Address 2",
          district: "District 2",
          neighborhood: "Neighborhood 2",
          price: 2000,
          gender_choices: "Male",
          n_room: 2,
          n_floor: 1,
          m2: 90,
          furnished: false,
          pet: true,
          smoking: false,
          utilities: ["Utility A", "Utility B"],
        },
      ],
    });

    render(<Compare />);


    expect(screen.getByText("Ad Title 1")).toBeInTheDocument();
    expect(screen.getByText("Ad Title 2")).toBeInTheDocument();
  });

  test("removes an ad when the remove button is clicked", async () => {
    localStorage.setItem("compareAds", JSON.stringify(["1"]));

    getAdById.mockResolvedValueOnce({
      advertisement_list: [
        {
          title: "Ad Title 1",
          photos: ["photo1.jpg"],
          user_full_name: "User 1",
          address: "Address 1",
          district: "District 1",
          neighborhood: "Neighborhood 1",
          price: 1000,
          gender_choices: "Any",
          n_room: 3,
          n_floor: 2,
          m2: 120,
          furnished: true,
          pet: false,
          smoking: true,
          utilities: ["Utility 1", "Utility 2"],
        },
      ],
    });

    render(<Compare />);


    const removeButton = screen.getByText("Kaldır");

    fireEvent.click(removeButton);

    expect(screen.queryByText("Ad Title 1")).not.toBeInTheDocument();
  });
});
