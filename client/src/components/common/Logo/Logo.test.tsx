import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { Logo } from "./Logo";


function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};


describe("Testing the Logo component content", () => {
    test("Should be in the document", () => {
        renderWithProviders(<Logo />);
        const lableElement = screen.getByRole('logo');
        expect(lableElement).toBeInTheDocument();
    });

});