import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../Redux";
import { Provider } from "react-redux";
import { UserProfileInformation } from "./UserProfileInformation";

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

describe('Test UserProfileInformation component content', () => {
    test('Should have title,button, two links, list with four items image', () => {
        renderWithProviders(<UserProfileInformation setIsUpdate={function (update: boolean): void { }} />)
        const title = screen.getByRole('profile-title');
        expect(title).toBeInTheDocument;
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument;
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
        const list= screen.getByRole('information-list');
        expect(list).toBeInTheDocument;
        const listItems = screen.getAllByRole('information-list-item');
        expect(listItems).toHaveLength(4);
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument;
    })
})