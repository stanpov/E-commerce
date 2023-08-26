import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Contacts } from "./Contacts";
import { BrowserRouter } from "react-router-dom";
import {prettyDOM,screen as screenTest} from '@testing-library/dom'


describe('Testing Contacts content', () => {
    
    test('Should contains 1 article', () => {
        render(<Contacts />, { wrapper: BrowserRouter });
        const articleElements = screen.getAllByRole('article');
        expect(articleElements).toHaveLength(1);
    });

    test('Should have 1 title', () => {
        render(<Contacts />, { wrapper: BrowserRouter });
        const titleElements = screen.getAllByText(/Contacts/i);
        expect(titleElements).toHaveLength(2);
    })

    test('Should 2 images', () => {
        render(<Contacts />, { wrapper: BrowserRouter });
        const ulElements = screen.getAllByRole('list');
        expect(ulElements).toHaveLength(2);
    })

    test('Should contains 1 addrees', () => {
        render(<Contacts />, { wrapper: BrowserRouter });
        const addressTitle = screen.getByRole('contentinfo');
        expect(addressTitle).toHaveTextContent('address');
        expect(addressTitle).toBeInTheDocument();
    })

    test('Should display images fliper with screen width under 768px', async () => {
        window.innerWidth = 768;
        fireEvent(window, new Event('resize'));
        render(<Contacts />, { wrapper: BrowserRouter });
        const flipImages = screen.getByTestId('size-test');
        expect(flipImages).toBeVisible();
    })

    // test('Should not display images fliper with screen width under 767px', async () => {
    //     window.innerWidth = 500;
    //     fireEvent(window, new Event("resize"));
    //     render(<Contacts />, { wrapper: BrowserRouter });
    //     const flipImages = screen.getByTestId('size-test');
    //     expect(flipImages).not.toBeVisible();
    //     expect(flipImages).not.toBeInTheDocument();
    //     expect(flipImages).toHaveStyle({visibility: 'hidden'});
        
    //     const style = window.getComputedStyle(flipImages)
    //     console.log(style);
    //     screenTest.debug(flipImages)
    //     expect(flipImages).toHaveStyle({ background: 'rgb(0, 0, 0)'});
    // })
})
