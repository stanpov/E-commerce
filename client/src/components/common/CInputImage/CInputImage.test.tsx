import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../Redux";
import { Provider } from "react-redux";
import { CInputImage } from "./CInputImage";

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

describe('Test Input content test',()=>{
    test('Should have lable , input  and icon',()=>{
        renderWithProviders(<CInputImage/>);
        const lable = screen.getByRole('profile-image');
        expect(lable).toBeInTheDocument;
        const input = screen.getByLabelText('');
        expect(input).toBeInTheDocument;
        const icon = screen.getByRole('profile-image-icon');
        expect(icon).toBeInTheDocument;
    })
})