import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { Logo } from "../../components/common/Logo/Logo";


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

describe('Test Home page content', () => {
    const mock = () => ({
        observe: jest.fn(),
        disconnect: jest.fn()
    });
    window.IntersectionObserver = jest.fn().mockImplementation(mock);

    test('Should have Logo', () => {
        renderWithProviders(<Home />);
        expect(<Logo/>).toBeInTheDocument;
    });

    test('Home page title should be in the document',()=>{
        renderWithProviders(<Home/>);
        const titleElement =  screen.getByTestId('home-page-title');
        expect(titleElement).toBeInTheDocument;
    })
    
});