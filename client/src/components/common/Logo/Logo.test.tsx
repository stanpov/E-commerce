import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { Logo } from "./Logo";
import userEvent from "@testing-library/user-event";
import { Home } from "../../../pages/Home/Home";


function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};


describe("Testing Logo component content", () => {
    test("Should be in the document", () => {
        renderWithProviders(<Logo />);
        const logoElement = screen.getByRole('logo');
        expect(logoElement).toBeInTheDocument();
    });

});
describe("Testing Logo component functionality", () => {
    test("Should render Home page on click", async () => {
        const user = userEvent;
        renderWithProviders(<Logo />);
        const logoElement = screen.getByRole('logo');
        await user.click(logoElement);
        expect(<Home/>).toBeInTheDocument;
    });
});