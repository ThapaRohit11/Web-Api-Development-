import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FavoriteButton from "../../../components/FavoriteButton";

const checkIfFavoritedMock = jest.fn();
const addFavoriteMock = jest.fn();
const removeFavoriteMock = jest.fn();

jest.mock("@/lib/actions/favorite-actions", () => ({
  checkIfFavorited: (...args: unknown[]) => checkIfFavoritedMock(...args),
  addFavorite: (...args: unknown[]) => addFavoriteMock(...args),
  removeFavorite: (...args: unknown[]) => removeFavoriteMock(...args),
}));

describe("FavoriteButton", () => {
  beforeEach(() => {
    checkIfFavoritedMock.mockReset();
    addFavoriteMock.mockReset();
    removeFavoriteMock.mockReset();
  });

  it("shows loading initially then not-favorited state", async () => {
    checkIfFavoritedMock.mockResolvedValue(false);

    render(<FavoriteButton recipeId="recipe-1" />);

    expect(screen.getByRole("button", { name: "♡" })).toBeDisabled();

    expect(await screen.findByRole("button", { name: "♡ Favorite" })).toBeInTheDocument();
  });

  it("adds favorite and triggers callback with true", async () => {
    checkIfFavoritedMock.mockResolvedValue(false);
    addFavoriteMock.mockResolvedValue({ success: true });
    const onFavoriteChange = jest.fn();

    render(<FavoriteButton recipeId="recipe-2" onFavoriteChange={onFavoriteChange} />);

    fireEvent.click(await screen.findByRole("button", { name: "♡ Favorite" }));

    await waitFor(() => {
      expect(addFavoriteMock).toHaveBeenCalledWith("recipe-2");
      expect(screen.getByRole("button", { name: "♥ Favorited" })).toBeInTheDocument();
      expect(onFavoriteChange).toHaveBeenCalledWith(true);
    });
  });

  it("removes favorite when currently favorited", async () => {
    checkIfFavoritedMock.mockResolvedValue(true);
    removeFavoriteMock.mockResolvedValue({ success: true });

    render(<FavoriteButton recipeId="recipe-3" />);

    fireEvent.click(await screen.findByRole("button", { name: "♥ Favorited" }));

    await waitFor(() => {
      expect(removeFavoriteMock).toHaveBeenCalledWith("recipe-3");
      expect(screen.getByRole("button", { name: "♡ Favorite" })).toBeInTheDocument();
    });
  });

  it("keeps non-favorited state when add favorite fails", async () => {
    checkIfFavoritedMock.mockResolvedValue(false);
    addFavoriteMock.mockResolvedValue({ success: false });

    render(<FavoriteButton recipeId="recipe-4" />);

    fireEvent.click(await screen.findByRole("button", { name: "♡ Favorite" }));

    await waitFor(() => {
      expect(addFavoriteMock).toHaveBeenCalledWith("recipe-4");
      expect(screen.getByRole("button", { name: "♡ Favorite" })).toBeInTheDocument();
    });
  });
});
