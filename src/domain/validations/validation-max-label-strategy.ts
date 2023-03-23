import { Position } from "../models/position";
import { ValidateLabelStrategy } from "./validation-strategy";

export class ValidateMaxLabelStrategy implements ValidateLabelStrategy {
    validate(value: number, currentFilter: Position, filter: Position): boolean {
      return value > filter.max || value <= currentFilter.min;
    }
  }
  