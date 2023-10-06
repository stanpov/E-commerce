import { CAddStarsRadios } from './CAddStarsRadios';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';


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

describe('Test CAddStarsRadios content', () => {
    test('Should have 5 radio inputs', () => {
        renderWithProviders(<CAddStarsRadios />);
        const inputs = screen.getAllByRole('radio');
        expect(inputs).toHaveLength(5);
    })
})

describe('Test CAddStarsRadios functionality', () => {
    test('Click on stars', () => {
        const onClick = jest.fn();
        renderWithProviders(<CAddStarsRadios />);
        const inputs = screen.getAllByRole('radio');
        fireEvent.click(inputs[3]);
        expect(onClick).toBeCalled;
    })

    test('Hover stars change color', () => {
        renderWithProviders(<CAddStarsRadios />);
        const stars = screen.getAllByTestId('stars-icons');
        const elementColor = getComputedStyle(stars[3]);
        expect(elementColor.color).toBe('rgb(201, 206, 214)');
        fireEvent.mouseEnter(stars[3]);
        const starsHovered = screen.getAllByTestId('stars-icons');
        const hoverElementColor = getComputedStyle(starsHovered[3]);
        expect(hoverElementColor.color).toBe('rgb(255, 102, 0)');
        fireEvent.mouseLeave(starsHovered[3]);
        const unhoveredStars = screen.getAllByTestId('stars-icons');
        const unhoverElementColor = getComputedStyle(unhoveredStars[3]);
        expect(unhoverElementColor.color).toBe('rgb(201, 206, 214)');
    })
})