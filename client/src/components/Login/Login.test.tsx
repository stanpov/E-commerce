import React from "react";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { Home } from "../../pages/Home/Home";
import { EnterEmail } from "../EnterEmail/EnterEmail";

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

describe('Test Login component content', () => {

    test('Should have one tilte', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const titleElement = screen.getByDisplayValue('Login');
        expect(titleElement).toBeInTheDocument();
    });

    test('Should have one form', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const formElement = screen.getByRole('login-form');
        expect(formElement).toBeInTheDocument();
    });

    test('Should have two inputs', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const inputElements = screen.getAllByRole('form-input');
        expect(inputElements).toHaveLength(2);
    });

    test('Should have two lables', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const inputLablesElements = screen.getAllByRole('input-lable');
        expect(inputLablesElements).toHaveLength(2);
    });

    test('Should have forgot password element', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const forgotPasswordElement = screen.getByText('Forgot password?');
        expect(forgotPasswordElement).toBeInTheDocument();
    });

    test('Should have submit button', () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const submitElement = screen.getByRole('submit-input');
        expect(submitElement).toBeInTheDocument();
    });
});

describe('Testing Login submit functionality', () => {
    test('On click Login if form inputs are empty should stay in Login page', async () => {
        const user = userEvent;
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        await user.click(screen.getByRole('submit-input'));
        expect(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />).toBeInTheDocument;
    });

    test('On click Login submit button should to go to Home Page', async () => {
        const user = userEvent;
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />);
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv.bg' } });
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123456' } });
        expect(email).toHaveValue('peter@abv.bg')
        expect(password).toHaveValue('123456')
        await user.click(screen.getByRole('submit-input'));
        expect(<Home />).toBeInTheDocument;
    });
});

describe('Test Forgot Password link', () => {
    test('Click Forgot Password', async () => {
        const user = userEvent;
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const forgotPasswordElement = screen.getByText('Forgot password?');
        await user.click(forgotPasswordElement);
        expect(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />).toBeInTheDocument;
    });
});

describe('Test validation messages functionality',()=>{
    
    test('Email input is empty', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const email = screen.getByLabelText('Email');
        fireEvent.blur(email);
        expect(email).toHaveValue('');
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Email is required!');
    });
   
    test('Email is invalid', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv' } });
        fireEvent.blur(email);
        expect(email).toHaveValue('peter@abv');
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Invalid email!');
    });

    test('Email is valid', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const email = screen.getByLabelText('Email');
        fireEvent.change(email, { 'target': { 'value': 'peter@abv.bg' } });
        fireEvent.blur(email);
        expect(email).toHaveValue('peter@abv.bg');
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });

    test('Password input is empty', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const password = screen.getByLabelText('Password');
        fireEvent.blur(password);
        expect(password).toHaveValue('');
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Password is required!');
    });
    
    test('Password is less then five characters', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123' } });
        fireEvent.blur(password);
        expect(password).toHaveValue('123');
        const validationMessage = screen.getByRole('validation-message');
        expect(validationMessage).toHaveTextContent('Password needs to be at least 5 characters long!');
    });

    test('Password is valid', async () => {
        renderWithProviders(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />)
        const password = screen.getByLabelText('Password');
        fireEvent.change(password, { 'target': { 'value': '123456' } });
        fireEvent.blur(password);
        expect(password).toHaveValue('123456');
        const validationMessage = null;
        expect(validationMessage).toEqual(null);
    });
});