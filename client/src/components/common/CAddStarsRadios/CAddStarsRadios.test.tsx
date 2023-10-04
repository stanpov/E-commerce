import {CAddStarsRadios} from './CAddStarsRadios';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";

let route = "/";

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

describe('Test CAddStarsRadios content',()=>{
    test('Should have 5 radio inputs',()=>{
        renderWithProviders(<CAddStarsRadios/>);
        const inputs = screen.getAllByRole('radio');
        
    })
})