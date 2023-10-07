import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EnterEmail } from "./EnterEmail";
import userEvent from "@testing-library/user-event";
import { CInput } from "../common/CInput/CInput";
import { CLable } from "../common/CLabel/CLabel";
import { CInputSubmit } from "../common/CInputSubmit/CInputSubmit";
import { useState as useStateMock } from 'react';

import { Home } from "../../pages/Home/Home";

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

describe('Testing Enter Email component content', () => {
    test('Should have title', () => {
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        const titleElement = screen.getByText(/Forgot password/i);
        expect(titleElement).toBeInTheDocument;
    });

    test('Should have enter email form', () => {
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        const formElement = screen.getByTestId('enter-email-form');
        expect(formElement).toBeInTheDocument;
    });

    test('Should have enter email input', () => {
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        expect(<CLable inputId={""} title={""} />).toBeInTheDocument;
        expect(<CInput type={"number"} name={""} id={""} placeholder={""} />).toBeInTheDocument;
        expect(<CInputSubmit value={""} />).toBeInTheDocument;
    });
});

describe('Testing Enter Email input functionality', () => {
    test('Input is empty should have \'Email is required!\' message', async () => {
        const user = userEvent;
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        const email = screen.getByLabelText('Enter your account email address here:');
        expect(email).toHaveTextContent('');
        fireEvent.blur(email);
        const validationMessage = screen.getByRole('enter-email-validation-message');
        expect(validationMessage).toBeInTheDocument;
        expect(validationMessage).toHaveClass('error__message');
        expect(validationMessage).toHaveTextContent('Email is required!');
    });

    test('Input is with wrong email should have \'Invalid email!\' message', async () => {
        const user = userEvent;
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        const email = screen.getByLabelText('Enter your account email address here:');
        expect(email).toHaveTextContent('');
        fireEvent.change(email, { 'target': { 'value': 'peter@gmail' } });
        fireEvent.blur(email);
        const validationMessage = screen.getByRole('enter-email-validation-message');
        expect(validationMessage).toBeInTheDocument;
        expect(validationMessage).toHaveClass('error__message');
        expect(validationMessage).toHaveTextContent('Invalid email!');
    });

    test('Input with valid email should not have message', async () => {
        const user = userEvent;
        renderWithProviders(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />);
        const email = screen.getByLabelText('Enter your account email address here:');
        fireEvent.change(email, { 'target': { 'value': 'peter@gmail.com' } });
        fireEvent.blur(email);
        expect(email).toHaveValue('peter@gmail.com');
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });
});

describe('Send button functionality', () => {
    test('Click submit button', async () => {
        
        const setStateMock = jest.fn();
        const useStateMock:any = (useState:any) =>[useState,setStateMock];
        jest.spyOn(React,'useState').mockImplementation(useStateMock);
        
        const setRotateVerification= jest.fn()
        renderWithProviders(<EnterEmail setRotateVerification={setRotateVerification(true)} />);
        const user = userEvent;
        const btn = screen.getByText(/Send/i);
        const email = screen.getByLabelText('Enter your account email address here:');
        fireEvent.change(email, { 'target': { 'value': 'peter@gmail.com' } });
        await user.click(btn);

        expect(setStateMock).toBeCalledWith( {"isValid": true, "message": ""});
        expect(setRotateVerification).toHaveBeenCalled();
    });
});
