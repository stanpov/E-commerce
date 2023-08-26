import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import {Home} from "../../pages/Home/Home";

let route = "/";

beforeEach(() => {
  route = "/";
  return route;
});

afterEach(() => {
  jest.clearAllMocks();
  route = "/";
  return route;
});

describe("Testing the content of the Header", () => {
  test("Should contains 6 numbers of li elements", () => {
    render(<Header />, { wrapper: BrowserRouter });
    const liElements = screen.getAllByRole("listitem");
    expect(liElements).toHaveLength(6);
  });

  test("Should not see the basket icon when size of window is more than 767px", async () => {
    window.innerWidth = 768;
    fireEvent(window, new Event("resize"));
    render(<Header />, { wrapper: BrowserRouter });
    const burgerMenu = screen.getByTestId("size-test");
    expect(burgerMenu).not.toBeVisible();
  });

  test("Should see the basket icon when size of window is less than 768px", async () => {
    window.innerWidth = 767;
    const user = userEvent;
    fireEvent(window, new Event("resize"));
    render(<Header />, { wrapper: BrowserRouter });
    const burgerMenu = screen.getByTestId("size-test");
    expect(burgerMenu).toBeInTheDocument();
    await user.click(screen.getByTestId("button-test"));
    const myCart = await screen.getByText(/My Cart/i);
    await user.click(myCart);
    expect(myCart).toHaveClass("active");
  });
});

describe("Testing the functionality of the Header", () => {
  test("Check when user click to About if it is going to About Page", async () => {
    const user = userEvent;
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByRole('link',{name:'About'}));
    expect(screen.getByRole('link',{name:'About'})).toBeInTheDocument();
  });

  test("Check when user click to the main Logo if it is going to Home Page", async () => {
    const user = userEvent;
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByAltText(/mainLogo/i));
    expect(<Home />).toBeInTheDocument;
  });

  test("On click to change className to be Active", async () => {
    const user = userEvent;
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
    const AboutLink = await screen.getByRole('link',{name:'About'});
    const ProductsLink = await screen.getByText(/Products/i);
    const ContactPage = await screen.getByText(/Contacts/i);
    const WishList = await screen.getByRole('link', {name:'Wish List'});
    
    await user.click(screen.getByRole('link',{name:'About'}));
    expect(AboutLink).toHaveClass("active");
    await user.click(screen.getByRole('link',{name:'Wish List'}));
    expect(WishList).toHaveClass("active");
    await user.click(screen.getByText(/Products/i));
    expect(ProductsLink).toHaveClass("active");
    await user.click(screen.getByText(/Contacts/i));
    expect(ContactPage).toHaveClass("active");
  });

  test("Should add active className to the button which open the burger menu.Also like this we are testing the functionality which open the burger menu", async () => {
    const user = userEvent;
    render(<Header />, { wrapper: BrowserRouter });
    const buttonBurger = screen.getByTestId("button-test");
    expect(buttonBurger).not.toHaveClass("active");
    await user.click(screen.getByTestId("button-test"));
    expect(buttonBurger).toHaveClass("active");
  });
});
