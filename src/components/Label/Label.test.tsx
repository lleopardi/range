import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
} from "@testing-library/react";
import * as React from "react";
import Label from "./LabelRange";
import userEvent from "@testing-library/user-event";
import { Position } from "../../domain/models/position";

const currentFilter: Position = {
  min: 10,
  max: 90,
};

const filter: Position = {
  min: 0,
  max: 100,
};

describe("when load the component", () => {
  test("should render the component", () => {
    render(
      <Label
        value={10}
        isEditable={false}
        alignContentEditable="left"
        onUpdateLabel={jest.fn}
        unit={"$"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    );

    const label = screen.getByTestId("label-range");

    expect(label).toBeDefined();
  });
});

describe("when the component is not editable", () => {
  test("should not able the form when user do click", async () => {
    render(
      <Label
        value={10}
        isEditable={false}
        alignContentEditable="left"
        onUpdateLabel={jest.fn}
        unit={"€"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    );
    let label = screen.getByTestId("label-range");

    await userEvent.click(label);
    label = screen.getByTestId("label-range");

    expect(label).toBeDefined();
  });
});

describe("when the component is editable", () => {
  let label: RenderResult;

  beforeEach(() => {
    label = render(
      <Label
        value={10}
        isEditable={true}
        alignContentEditable="left"
        onUpdateLabel={jest.fn}
        unit={"€"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("should render the component", () => {
    const { getByText, queryByRole } = label;

    const textAmount = getByText(/10 €/);
    const form = queryByRole("form")

    expect(textAmount).toBeDefined();
    expect(form).toBeFalsy();
  });

  test("should render the form", async () => {
    const { getByTestId, queryByText } = label
    const labelRange = getByTestId('label-range')

    await userEvent.click(labelRange)
    const form = getByTestId('input-range')
    const textAmount = queryByText(/10 €/);

    expect(textAmount).toBeDefined();
    expect(form).toBeDefined()
  });

  test("should update the value of label with blur event", async() => {
    const onUpdateLabel = jest.fn();
    cleanup()
    const { getByTestId } = render(
        <Label
        value={10}
        isEditable={true}
        alignContentEditable="left"
        onUpdateLabel={onUpdateLabel}
        unit={"€"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    )
    const labelRange = getByTestId("label-range")

    await userEvent.click(labelRange);
    const input = getByTestId("input-range");
    fireEvent.change(input, { target: { value: "50" }, bubble: true });
    fireEvent.blur(input);

    expect(onUpdateLabel).toHaveBeenCalledWith("50", "minLabel");
  });

  test("should update the value of label with submit event", async() => {
    const onUpdateLabel = jest.fn().mockReturnValue(false);
    cleanup()
    const { getByTestId } = render(
      <Label
        value={10}
        isEditable={true}
        alignContentEditable="left"
        onUpdateLabel={onUpdateLabel}
        unit={"€"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    );
    const labelRange = getByTestId("label-range")

    await userEvent.click(labelRange);
    const input = getByTestId("input-range");
    fireEvent.change(input, { target: { value: "60" }, bubble: true });
    fireEvent.submit(input);

    expect(onUpdateLabel).toHaveBeenCalledWith("60", "minLabel");
  });

  test("should mark the value as invalid", async() => {
    const onUpdateLabel = jest.fn();
    cleanup()
    const { getByTestId } = render(
      <Label
        value={10}
        isEditable={true}
        alignContentEditable="left"
        onUpdateLabel={onUpdateLabel}
        unit={"€"}
        type={"minLabel"}
        currentFilter={currentFilter}
        filter={filter}
      />
    );
    const labelRange = getByTestId("label-range")

    await userEvent.click(labelRange);
    const input = getByTestId("input-range");
    fireEvent.change(input, { target: { value: "90" }, bubble: true });
    fireEvent.blur(input);

    expect(input.getAttribute("class")).toBe("error");
  });
});
