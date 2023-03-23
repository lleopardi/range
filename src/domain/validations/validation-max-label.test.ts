import { ValidateMaxLabelStrategy } from './validation-max-label-strategy'
import { Position } from "../models/position"

describe('ValidationMaxLabel', () => {
    const currentFilter: Position = {
        min: 20,
        max: 80
    }

    const filter: Position = {
        min: 0,
        max: 100
    }
    test('should return false whe the value is valid', () => {
        const strategy = new ValidateMaxLabelStrategy()
        

        const isValid = strategy.validate(50, currentFilter, filter)

        expect(isValid).toBeFalsy()
    })

    test('should return true whe the value is inValid', () => {
        const strategy = new ValidateMaxLabelStrategy()

        const isValid = strategy.validate(110, currentFilter, filter)

        expect(isValid).toBeTruthy()
    })
})