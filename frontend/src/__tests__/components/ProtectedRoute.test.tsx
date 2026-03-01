import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { isAuthenticated, isAdmin } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

jest.mock("@/lib/auth-utils", () => ({
  isAuthenticated: jest.fn(),
  isAdmin: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const isAuthenticatedMock = isAuthenticated as jest.MockedFunction<typeof isAuthenticated>;
const isAdminMock = isAdmin as jest.MockedFunction<typeof isAdmin>;
const redirectMock = redirect as jest.MockedFunction<typeof redirect>;

describe("ProtectedRoute", () => {
  beforeEach(() => {
    isAuthenticatedMock.mockReset();
    isAdminMock.mockReset();
    redirectMock.mockReset();
  });

  it("redirects to /login when not authenticated", async () => {
    isAuthenticatedMock.mockResolvedValue(false);

    const output = await ProtectedRoute({ children: <div>Private</div> });
    render(output);

    expect(redirectMock).toHaveBeenCalledWith("/login");
  });

  it("redirects non-admin user to /user/profile when admin required", async () => {
    isAuthenticatedMock.mockResolvedValue(true);
    isAdminMock.mockResolvedValue(false);

    const output = await ProtectedRoute({ children: <div>Admin</div>, requireAdmin: true });
    render(output);

    expect(redirectMock).toHaveBeenCalledWith("/user/profile");
  });

  it("renders children when authenticated and admin check passes", async () => {
    isAuthenticatedMock.mockResolvedValue(true);
    isAdminMock.mockResolvedValue(true);

    const output = await ProtectedRoute({ children: <div>Allowed</div>, requireAdmin: true });
    render(output);

    expect(screen.getByText("Allowed")).toBeInTheDocument();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("renders children for authenticated user when admin is not required", async () => {
    isAuthenticatedMock.mockResolvedValue(true);

    const output = await ProtectedRoute({ children: <div>Member Area</div> });
    render(output);

    expect(screen.getByText("Member Area")).toBeInTheDocument();
    expect(isAdminMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
