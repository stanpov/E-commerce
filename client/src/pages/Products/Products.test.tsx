import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Products from "./Products";

describe("Testing the content of the Products Page", () => {
  test("First test just added to check the coverage need to be changed lated", () => {
    render(<Products />);
    const productElements = screen.getByText(/Products/i);
    expect(productElements).toBeInTheDocument();
  });
});
