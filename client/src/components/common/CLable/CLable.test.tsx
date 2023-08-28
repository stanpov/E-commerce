import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CLable } from "./CLable";


function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};


describe("Testing the CLable component content", () => {
    test("Should be in the document", () => {
        renderWithProviders(<CLable inputId={""} title={""} />);
        const lableElement = screen.getByRole('input-lable');
        expect(lableElement).toBeInTheDocument();
    });

    test("Should have textcontent", () => {
        renderWithProviders(<CLable inputId={""} title={"Email"} />);
        const lableElement = screen.getByRole('input-lable');
        expect(lableElement).toHaveTextContent('Email')
    });

});