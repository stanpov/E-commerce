import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { Home } from "../../pages/Home/Home";
import { store } from "../../Redux";
import configureStore from "redux-mock-store";

let route = "/";
const loggedInState = {
    auth: {
        isAdmin: false,
        userId: "my logged id test",
        isError: false,
        isLoading: false,
        message: "User successfully logged in",
    },
};

function renderWithProviders(element: React.ReactElement, mockStore?: any) {
    if (mockStore) {
        render(
            <Provider store={mockStore}>
                <BrowserRouter>{element}</BrowserRouter>
            </Provider>
        );
    } else {
        render(
            <Provider store={store}>
                <BrowserRouter>{element}</BrowserRouter>
            </Provider>
        );
    }
}

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return route;
});

afterEach(() => {
    jest.clearAllMocks();
    return route;
});

describe("Testing the content of the Header", () => {
    test("Should contains 4 numbers of li elements when you are not logged in", () => {
        renderWithProviders(<Header />);
        const liElements = screen.getAllByRole("listitem");
        expect(liElements).toHaveLength(8);
    });

    test("Should not see the basket icon when size of window is more than 767px", async () => {
        window.innerWidth = 768;
        fireEvent(window, new Event("resize"));
        renderWithProviders(<Header />);
        const burgerMenu = screen.getByTestId("size-test");
        expect(burgerMenu).toBeInTheDocument();
    });

    test("Should see the basket icon when size of window is less than 768px, and when user is not logged in", async () => {
        window.innerWidth = 700;
        const user = userEvent;
        fireEvent(window, new Event("resize"));
        renderWithProviders(<Header />);
        const burgerMenu = screen.getByTestId("size-test");
        expect(burgerMenu).toBeInTheDocument();
        await user.click(screen.getByTestId("button-test"));
        const products = await screen.getByRole("link", { name: "Products" });
        await user.click(products);
        expect(products).toHaveClass("active");
    });
});

describe("Testing the functionality of the Header", () => {
    test("Check when user click to About if it is going to About Page", async () => {
        const user = userEvent;
        renderWithProviders(<App />);
        await user.click(screen.getByRole("link", { name: "About" }));
        expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    });

    test("Check when user click to the main Logo if it is going to Home Page", async () => {
        const user = userEvent;
        renderWithProviders(<App />);
        await user.click(screen.getAllByAltText(/mainLogo/i)[0]);
        expect(<Home />).toBeInTheDocument;
    });

    test("On click to change className to be Active", async () => {
        const user = userEvent;
        renderWithProviders(<App />);
        const AboutLink = await screen.getByRole("link", { name: "About" });
        const ProductsLink = await screen.getByRole("link", { name: "Products" });
        const ContactPage = await screen.getByRole("link", { name: "Contacts" });

        await user.click(screen.getByRole("link", { name: "About" }));
        expect(AboutLink).toHaveClass("active");
        await user.click(screen.getByRole("link", { name: "Products" }));
        expect(ProductsLink).toHaveClass("active");
        await user.click(screen.getByRole("link", { name: "Contacts" }));
        expect(ContactPage).toHaveClass("active");
    });

    test("Should add active className to the button which open the burger menu.Also like this we are testing the functionality which open the burger menu", async () => {
        const user = userEvent;
        renderWithProviders(<Header />);
        const buttonBurger = screen.getByTestId("button-test");
        expect(buttonBurger).not.toHaveClass("active");
        await user.click(screen.getByTestId("button-test"));
        expect(buttonBurger).toHaveClass("active");
    });
});

describe("Testing when user is logged in", () => {
    test("Should render logout link, when user is logged in", async () => {
        const user = userEvent;
        const mockStore = configureStore();
        const userStore = mockStore(loggedInState);
        userStore.clearActions();

        renderWithProviders(<Header />, userStore);
        const LogoutLink = await screen.getByTestId("logout-link");
        const LogoutChildLink = await screen.getByRole("link", { name: "Logout" });
        expect(LogoutLink).toHaveClass("navigation__list__basket");
        await user.click(LogoutChildLink);
        expect(LogoutChildLink).toHaveClass("active");
    });

    test("Should render wish list link, when user is logged in", async () => {
        const user = userEvent;
        const mockStore = configureStore();
        const userStore = mockStore(loggedInState);
        userStore.clearActions();

        renderWithProviders(<Header />, userStore);
        const WishlistLink = await screen.getByTestId("wishlist-link");
        const wishListListChild = await screen.getByRole("link", {
            name: "Wish List",
        });
        expect(WishlistLink).toHaveClass("navigation__list__item");
        await user.click(wishListListChild);
        expect(wishListListChild).toHaveClass("active");
    });

    test("Should not seen sign in or logg in link when user is logged in", async () => {
        const mockStore = configureStore();
        const userStore = mockStore(loggedInState);
        userStore.clearActions();

        renderWithProviders(<Header />, userStore);
        const SignInOrLogInLink = await screen.getByTestId("signin_login-link");
        expect(SignInOrLogInLink).toHaveClass("hidden__element");
    });

    test("Should see my profile link when user is logged in", async () => {
        const user = userEvent;
        const mockStore = configureStore();
        const userStore = mockStore(loggedInState);
        userStore.clearActions();

        renderWithProviders(<Header />, userStore);
        const myProfileLink = await screen.getByTestId("myProfileLink");

        expect(myProfileLink).toHaveClass("navigation__list__basket");
        const myProfileChildLink = await screen.getByRole("link", {
            name: "My Profile",
        });
        await user.click(myProfileChildLink);
        expect(myProfileChildLink).toHaveClass("active");
    });
});
