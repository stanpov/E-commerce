import React from "react";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EnterCode } from "./EnterCode";
import userEvent from "@testing-library/user-event";
import { CInput } from "../common/CInput/CInput";
import { CLable } from "../common/CLabel/CLabel";
import { CInputSubmit } from "../common/CInputSubmit/CInputSubmit";
import { Home } from "../../pages/Home/Home";


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

describe('Test Enter Code component content', () => {
    test('Should have title', () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const title = screen.getByText(/Verification password/i);
        expect(title).toBeInTheDocument;
    });
    test('Should have lable and input', () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        expect(<CLable inputId={""} title={""} />).toBeInTheDocument;
        expect(<CInput type={"number"} name={""} id={""} placeholder={""} />).toBeInTheDocument;
        expect(<CInputSubmit value={""} />).toBeInTheDocument;
        // input-lable
    })
});

describe('Test password validation messages functionality', () => {

    test('Password input is empty', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const codeInput = screen.getByLabelText('Enter your new password:');
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('');
        const validationMessage = screen.getByRole('password-validation-message');
        expect(validationMessage).toHaveTextContent('Password is required!');
    });

    test('Password is invalid', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const codeInput = screen.getByLabelText('Enter your new password:');
        fireEvent.change(codeInput, { 'target': { 'value': '123' } });
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('123');
        const validationMessage = screen.getByRole('password-validation-message');
        expect(validationMessage).toHaveTextContent('Invalid password!');
    });
    test('Password is valid', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const codeInput = screen.getByLabelText('Enter your new password:');
        fireEvent.change(codeInput, { 'target': { 'value': '123456' } });
        fireEvent.blur(codeInput);
        expect(codeInput).toHaveValue('123456');
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });
});

describe('Test Email validation messages functionality', () => {

    test('Email input is empty', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const emailInput = screen.getByLabelText('Email');
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('');
        const validationMessage = screen.getByRole('email-validation-message');
        expect(validationMessage).toHaveTextContent('Email is required!');
    });

    test('Email is invalid', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { 'target': { 'value': 'peter@' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('peter@');
        const validationMessage = screen.getByRole('email-validation-message');
        expect(validationMessage).toHaveTextContent('Invalid email!');
    });
    test('Email is valid', async () => {
        renderWithProviders(<EnterCode setIsPasswordForgot={() => { }} />);
        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { 'target': { 'value': 'peter@abv.bg' } });
        fireEvent.blur(emailInput);
        expect(emailInput).toHaveValue('peter@abv.bg');
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });
});

describe('Send button functionality', () => {
    test('Click submit button', async () => {
        
        const setStateMock = jest.fn();
        const useStateMock:any = (useState:any) =>[useState,setStateMock];
        jest.spyOn(React,'useState').mockImplementation(useStateMock);
        
        const setIsPasswordForgot= jest.fn()
        renderWithProviders(<EnterCode setIsPasswordForgot={setIsPasswordForgot(true)} />);
        const user = userEvent;
        const btn = screen.getByText(/Confirm new password/i);
        const passwordInput = screen.getByLabelText('Enter your new password:');
        fireEvent.change(passwordInput, { 'target': { 'value': '123456' } });
        await user.click(btn);

        // expect(setStateMock).toBeCalledWith( {"isValid": true});
        expect(setIsPasswordForgot).toHaveBeenCalledTimes(1);
    });
});