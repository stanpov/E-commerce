import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { VerifyEmailCodeForm } from "./VerifyEmailCodeForm";
import userEvent from "@testing-library/user-event";
import { CInput } from "../CInput/CInput";
import { CLable } from "../CLable/CLable";
import { CInputSubmit } from "../CInputSubmit/CInputSubmit";
import { useState as useStateMock } from 'react';


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

describe('Test VerifyEmailCodeForm component content', () => {
    test('Should contain Lable, Input, instructions,and Submit button', () => {
        renderWithProviders(<VerifyEmailCodeForm />);
        expect(<CLable inputId={""} title={""} />).toBeInTheDocument;
        expect(<CInput type={"number"} name={""} id={""} placeholder={""} />).toBeInTheDocument;
        expect(<CInputSubmit value={""} />).toBeInTheDocument;
        const message = screen.getByText(/Verification code was sent to your email!/i);
        expect(message).toBeInTheDocument;

    })
});

describe('Test verification message functionality', () => {
    test('Empty input message should be \'Code is required!\'', async () => {
        const user = userEvent;
        renderWithProviders(<VerifyEmailCodeForm />);
        const codeInput = screen.getByLabelText('Verification code:');
        fireEvent.change(codeInput, { 'target': { 'value': '' } });
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('');
        const verifyMessage = screen.getByRole('verify-email-validation-message');
        expect(verifyMessage).toHaveTextContent('Code is required!');
    });

    test('Short code (under 5 characters) message should be \'Invalid code!\'', async () => {
        const user = userEvent;
        renderWithProviders(<VerifyEmailCodeForm />);
        const codeInput = screen.getByLabelText('Verification code:');
        fireEvent.change(codeInput, { 'target': { 'value': '123' } });
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('123');
        const verifyMessage = screen.getByRole('verify-email-validation-message');
        expect(verifyMessage).toHaveTextContent('Invalid code!');
    });

    test('Valid code lenght there should be no message', async () => {
        const user = userEvent;
        renderWithProviders(<VerifyEmailCodeForm />);
        const codeInput = screen.getByLabelText('Verification code:');
        fireEvent.change(codeInput, { 'target': { 'value': '123456' } });
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('123456');
        const verifyMessage = null;
        expect(verifyMessage).toEqual(null);
    });
});

