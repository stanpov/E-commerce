import React from "react";
import { Provider } from "react-redux";
import { store } from "../../Redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginSignUp } from "./LoginSignUp";
import userEvent from "@testing-library/user-event";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../components/Login/Login";
import { SignUp } from "../../components/SignUp/SignUp";
import { EnterEmail } from "../../components/EnterEmail/EnterEmail";
import { EnterCode } from "../../components/EnterCode/EnterCode";

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

describe('Login / Sign Up page content', () => {
    test('Should have two flip cards', () => {
        renderWithProviders(<LoginSignUp />);
        const flipElementOne = screen.getByRole('flip-container-one');
        expect(flipElementOne).toBeInTheDocument;
        const flipElementTwo = screen.getByRole('flip-container-two');
        expect(flipElementTwo).toBeInTheDocument;
    });

    test('Login / Sign Up option', () => {
        renderWithProviders(<LoginSignUp />);
        const optioTitles = screen.getAllByRole('option-title');
        expect(optioTitles).toHaveLength(2);
    });

    test('Login component should be rendered', () => {
        renderWithProviders(<LoginSignUp />);
        expect(<Login setIsPasswordForgot={function (forgot: boolean): void { }} />).toBeInTheDocument;
    });

    test('Sibg Up component should be rendered', () => {
        renderWithProviders(<LoginSignUp />);
        expect(<SignUp />).toBeInTheDocument;
    });
    test('Enter Email component should be rendered', () => {
        renderWithProviders(<LoginSignUp />);
        expect(<EnterEmail setRotateVerification={function (rotate: boolean): void { }} />).toBeInTheDocument;
    });
    test('Enter password component should be rendered', () => {
        renderWithProviders(<LoginSignUp />);
        expect(<EnterCode setIsPasswordForgot={function (forgot: boolean): void { }} />).toBeInTheDocument;
    });

    test('Flip button should be in the document', () => {
        renderWithProviders(<LoginSignUp />);
        const flipButtonElement = screen.getByRole('flip-button');
        expect(flipButtonElement).toBeInTheDocument;
    });
});

describe('Login / Sign Up page functionality', () => {
    test('Click flip button change arrow positin', async () => {
        const user = userEvent;
        renderWithProviders(<LoginSignUp />);
        const flipButtonElement = screen.getByRole('flip-button');
        const arrow = screen.getByRole('arrow');
        await user.click(flipButtonElement);
        expect(arrow).toHaveClass('arrow flip__left')
        await user.click(flipButtonElement);
        expect(arrow).toHaveClass('arrow flip__right')

    });
    test('Click Login title', async () => {
        const user = userEvent;
        renderWithProviders(<LoginSignUp />);
        const loginTitle = screen.getAllByText('Login');
        const flipInner = screen.getByRole('flip-inner-one');
        await user.click(loginTitle[0]);
        expect(flipInner).toHaveClass('flip__inner')
    });
    test('Click SignUp title', async () => {
        const user = userEvent;
        renderWithProviders(<LoginSignUp />);
        const signupTitle = screen.getByText('SignUp');
        const flipInner = screen.getByRole('flip-inner-one');
        await user.click(signupTitle);
        expect(flipInner).toHaveClass('flip__inner')
    });
});

describe('Forgot password functionality',()=>{
    test('Click forgot password', async ()=>{
        const user = userEvent;
        renderWithProviders(<LoginSignUp/>);
        const forgotPasswordElement = screen.getByText('Forgot password?');
        const flipOne = screen.getByRole('flip-container-one');
        const flipTwo = screen.getByRole('flip-container-two');
        await user.click(forgotPasswordElement);
        expect(flipOne).toHaveClass('flip__wrapper first__right');
        expect(flipTwo).toHaveClass('flip__wrapper second__right');
    });

    test('Confirm new password clicking \'Confirm new password\' button', async()=>{
        const user = userEvent;
        renderWithProviders(<LoginSignUp/>);
        const confirmNewPassword = screen.getByDisplayValue('Confirm new password');
        const secondInner = screen.getByRole('flip-inner-two');
        await user.click(confirmNewPassword);
        expect(secondInner).toHaveClass('flip__inner');
    });
}); 