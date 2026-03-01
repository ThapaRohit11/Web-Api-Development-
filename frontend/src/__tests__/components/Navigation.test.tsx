import { render, screen } from "@testing-library/react";
import Navigation from "../../../components/Navigation";

const usePathnameMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

jest.mock("next/link", () => {
  return ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

jest.mock("../../../components/ConfirmLogoutButton", () => {
  return function MockConfirmLogoutButton() {
    return <button type="button">Logout</button>;
  };
});

describe("Navigation", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
  });

  it("renders non-admin links and hides admin links", () => {
    usePathnameMock.mockReturnValue("/user/profile");

    render(<Navigation isAdmin={false} />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("User Management")).not.toBeInTheDocument();
  });

  it("renders admin links and hides profile", () => {
    usePathnameMock.mockReturnValue("/admin/dashboard");

    render(<Navigation isAdmin />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Recipes")).toBeInTheDocument();
    expect(screen.getByText("User Management")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("applies active class for current path", () => {
    usePathnameMock.mockReturnValue("/admin/users");

    render(<Navigation isAdmin />);

    const usersLink = screen.getByText("User Management");
    expect(usersLink.className).toContain("bg-blue-600");
  });

  it("always renders brand and logout button", () => {
    usePathnameMock.mockReturnValue("/dashboard/home");

    render(<Navigation isAdmin={false} />);

    expect(screen.getByText("Recipe Finder")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});
