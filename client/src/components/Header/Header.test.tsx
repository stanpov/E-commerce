import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

test("Should contains 6 numbers of li elements", () => {
  render(<Header />, { wrapper: BrowserRouter });
  const liElements = screen.getAllByRole("listitem");
  expect(liElements).toHaveLength(6);
});
