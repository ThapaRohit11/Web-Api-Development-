import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConfirmLogoutButton from "../../../components/ConfirmLogoutButton";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("ConfirmLogoutButton", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("opens modal on logout click and closes on cancel", async () => {
    render(<ConfirmLogoutButton className="btn" />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));
    expect(await screen.findByText("Are you sure you want to logout?")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Cancel" })[0]);

    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to logout?")).not.toBeInTheDocument();
    });
  });

  it("navigates to /logout on confirm", async () => {
    render(<ConfirmLogoutButton />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));
    const logoutButtons = await screen.findAllByRole("button", { name: "Logout" });
    fireEvent.click(logoutButtons[1]);

    expect(pushMock).toHaveBeenCalledWith("/logout");
  });
});
