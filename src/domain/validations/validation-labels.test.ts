import { ValidateLabel } from "./validations-labels"
import { ValidateMaxLabelStrategy } from './validation-max-label-strategy'
import { Position } from "../models/position"

describe('ValidationLabel', () => {
    test('should set a strategy when call to setStrategy', () => {
        const validateLabel = new ValidateLabel()
        const strategy = new ValidateMaxLabelStrategy()

        validateLabel.setStrategy(strategy)
    })

    test('should validate by strategy when call to validate', () => {
        const validateLabel = new ValidateLabel()
        const strategy = new ValidateMaxLabelStrategy()
        const currentFilter: Position = {
            min: 20,
            max: 80
        }

        const filter: Position = {
            min: 0,
            max: 100
        }

        validateLabel.setStrategy(strategy)
        const isValid = validateLabel.validate(20, currentFilter, filter)

        expect(isValid).toBe(true)
    })
})