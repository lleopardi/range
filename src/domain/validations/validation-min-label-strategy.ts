import { Position } from "../models/position";
import { ValidateLabelStrategy } from "./validation-strategy";

export class ValidateMinLabelStrategy implements ValidateLabelStrategy {
    validate(value: number, currentFilter: Position, filter: Position): boolean {
      return value < filter.min || value >= currentFilter.max;
    }
  }