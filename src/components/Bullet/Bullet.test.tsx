import { render, screen, fireEvent } from "@testing-library/react";

import React from "react";
import Bullet from "./Bullet";

describe("Bullet component", () => {
  let onDrag = jest.fn();
  let onMouseDown = jest.fn();
  let onDragEnd = jest.fn();

  beforeEach(() => {
    onDrag = jest.fn();
    onMouseDown = jest.fn();
    onDragEnd = jest.fn();
    render(
      <Bullet
        id="min"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onMouseDown={onMouseDown}
        position={50}
      />
    );
  });

  test("when is mounted should render the component", () => {
    const bullet = screen.getByTestId("bullet");
    const { left } = bullet.style;

    expect(bullet).toBeDefined();
    expect(left).toBe("50px");
  });

  describe("when the user interact with the mouse", () => {
    test("when the user click on the bullet should execute onMouseDownEvent", () => {
      let bullet = screen.getByTestId("bullet");

      fireEvent.mouseEnter(bullet);
      fireEvent.mouseDown(bullet);
      bullet = screen.getByTestId("bullet");

      expect(onMouseDown).toHaveBeenCalled();
    });

    test("when the user drag the click on the bullet should execute onDrag", () => {
      let bullet = screen.getByTestId("bullet");

      fireEvent.mouseEnter(bullet);
      fireEvent.mouseDown(bullet, {});
      fireEvent.mouseMove(bullet);
      fireEvent.mouseUp(bullet);

      expect(onDrag).toHaveBeenCalled();
    });

    test("when the user release the click on the bullet should execute onDragEnd", () => {
      let bullet = screen.getByTestId("bullet");

      fireEvent.mouseEnter(bullet);
      fireEvent.mouseDown(bullet);
      fireEvent.mouseUp(bullet);

      expect(onDragEnd).toHaveBeenCalled();
    });

    test('when the user lose the focus from the bullet should execute onDragEnd', () => {
        let bullet = screen.getByTestId("bullet");

        fireEvent.mouseEnter(bullet)
        fireEvent.mouseLeave(bullet)

        expect(onDragEnd).toHaveBeenCalled()
    })

  });
});
