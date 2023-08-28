import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CInputSubmit } from "./CInputSubmit";
import userEvent from "@testing-library/user-event";
import { SignUp } from "../../SignUp/SignUp";
import { Home } from "../../../pages/Home/Home";


let route = '/';

function renderWithProviders(element: React.ReactElement) {
    render(
        <Provider store={store}>
            <BrowserRouter>{element}</BrowserRouter>
        </Provider>
    );
};

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

describe("Testing the CInputSubmit content", () => {
    test("Should be in the document", () => {
        renderWithProviders(<CInputSubmit value={''} />);
        const submitElement = screen.getByRole("submit-input");
        expect(submitElement).toBeInTheDocument();
    });

    test("Should have value Send", () => {
        renderWithProviders(<CInputSubmit value={'Send'} />);
        const submitElement = screen.getByRole("submit-input");
        expect(submitElement).toHaveValue('Send');
    });
});

