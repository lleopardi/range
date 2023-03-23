import { render } from "@testing-library/react";
import React from "react";
import { MoveBullet } from "../domain/move-bullet";
import { MoveMinBulletStrategy } from "../domain/move-min-bullet-strategy";
import { getBoundaries, getFilterValue, getMaxAndMinValues, getMoveStrategy, getPositionFromLabel, getTranslate, isOutOfLimits } from "./utils";

describe("Utils", () => {
  describe("getMaxAndMinValues", () => {
    test("Should return the same value when the param has the form {min,max}", () => {
      // Arrange
      const filter = { min: 10, max: 100 };

      // Act
      const maxAndMin = getMaxAndMinValues(filter);

      // Assert
      expect(filter.min).toBe(maxAndMin.min);
    });

    test("should transform the array to an object", () => {
      const filter = [1, 2, 3, 4, 5, 6];
      const answer = { min: 1, max: 6 };

      const maxAndMin = getMaxAndMinValues(filter);

      expect(maxAndMin).toEqual(answer);
    });
  });

  describe("when validate the limits of translate", () => {
    test("should return true is the translate is out of the limits", () => {
      const translate = 120;
      const width = 100;

      const isInvalid = isOutOfLimits(translate, width);

      expect(isInvalid).toBeTruthy();
    });

    test("should return false is the translate is inside of the limits", () => {
        const translate = 50;
        const width = 100;
  
        const isValid = isOutOfLimits(translate, width);
  
        expect(isValid).toBeFalsy();
      });
  });

  test('should get and strategy of movement the bullet',()=> {
    const move = getMoveStrategy("min")

    expect(move).toBeInstanceOf(MoveBullet)
  })

  test('should get the value to translate the bullet', () => {
    const translate = getTranslate(400, 100)

    expect(translate).toBe(280)
  })

  test('should calculate the boundaries of an HTML element', async ()=>{
    const {findByText} = render(<div>Hello World</div>)
    const mockBoundaries = { min: -10, max: -10, width: 0 }

    const div = await findByText(/Hello World/)
    const boundaries = getBoundaries(div)

    expect(boundaries).toEqual(mockBoundaries)
    
  })

  test('should get the positios of a bullet from the value of the label', () => {
    const filter = { min: 0, max: 100 }
    
    const value = getPositionFromLabel(filter, 100, 59)

    expect(value).toBe(49)

  })

  test('should return the value of a bullet by translate', () => {
    const filter = { min: 0, max: 100 }
    const withOfContainer = 300
    const translateBullet = 100
    
    const value = getFilterValue(filter, withOfContainer, translateBullet)

    expect(value).toBe(37)
  })


});
