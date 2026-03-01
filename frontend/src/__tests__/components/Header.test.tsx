import { render, screen } from "@testing-library/react";
import Header from "../../../app/(auth)/components/Header";
import { isAuthenticated } from "@/lib/auth-utils";

jest.mock("@/lib/auth-utils", () => ({
  isAuthenticated: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

jest.mock("@/components/ConfirmLogoutButton", () => {
  return function MockConfirmLogoutButton() {
    return <button type="button">Logout</button>;
  };
});

const isAuthenticatedMock = isAuthenticated as jest.MockedFunction<typeof isAuthenticated>;

describe("Header", () => {
  beforeEach(() => {
    isAuthenticatedMock.mockReset();
  });

  it("renders login/sign-up links when not authenticated", async () => {
    isAuthenticatedMock.mockResolvedValue(false);

    const header = await Header();
    render(header);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  it("renders profile/logout/favorites when authenticated", async () => {
    isAuthenticatedMock.mockResolvedValue(true);

    const header = await Header();
    render(header);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });
});
