import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmModal from "../../../components/ConfirmModal";

describe("ConfirmModal", () => {
  it("does not render when open is false", () => {
    render(
      <ConfirmModal
        open={false}
        title="Delete"
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("renders title/message and calls handlers", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(
      <ConfirmModal
        open
        title="Delete Recipe"
        message="This action cannot be undone"
        confirmText="Yes, delete"
        cancelText="No"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    expect(screen.getByText("Delete Recipe")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "No" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, delete" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows loading state and disables action buttons", () => {
    render(
      <ConfirmModal
        open
        title="Logout"
        message="Confirm"
        loading
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Please wait..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });

  it("uses default confirm/cancel labels when not provided", () => {
    render(
      <ConfirmModal
        open
        title="Default Labels"
        message="Message"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
