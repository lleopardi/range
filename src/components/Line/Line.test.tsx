import { render, screen } from "@testing-library/react";
import React from "react";
import Line from "./Line";

const setup = jest.fn();

describe("Line Component", () => {
  test("should render a div when mount component", () => {
    const textToRender = "It Works";

    render(<Line setup={setup}>{textToRender}</Line>);
    const element = screen.getByText(textToRender);

    expect(element.textContent).toEqual(textToRender);
  });
});
