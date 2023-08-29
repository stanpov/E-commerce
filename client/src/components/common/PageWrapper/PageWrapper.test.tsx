import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../Redux";
import { BrowserRouter } from "react-router-dom";
import { PageWrapper } from "./PageWrapper";


function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};

describe('PageWrapper content',()=>{
    test('Should be rendered',()=>{
        renderWithProviders(<PageWrapper/>);
        const pageWrapper = screen.getByTestId('page-wrapper');
        expect(pageWrapper).toBeInTheDocument;
    })
});