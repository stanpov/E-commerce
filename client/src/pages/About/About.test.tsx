import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { About } from "./About";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('Testing About content', () => {
    const mock = ()=>({
        observe: jest.fn(),
        disconnect: jest.fn()
    });
    window.IntersectionObserver = jest.fn().mockImplementation(mock);


    test('Should contains 4 article',  () => {
        render(<About />, { wrapper: BrowserRouter });
        const articleElements = screen.getAllByRole('article');
        expect(articleElements).toHaveLength(4);
    });

    test('Should contains 4 headings',  () => {
        render(<About />, { wrapper: BrowserRouter });
        const headingElements = screen.getAllByTestId('heading-about-test');
        expect(headingElements).toHaveLength(4);
    });

    test('Should contains 10 icons',  () => {
        render(<About />, { wrapper: BrowserRouter });
        const headingElements = screen.getAllByTestId('icon-about-test');
        expect(headingElements).toHaveLength(10);
    });

    
});