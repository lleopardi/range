import { Position } from "../models/position";
import { ValidateLabelStrategy } from "./validation-strategy";

export class ValidateLabel {
    private strategy: ValidateLabelStrategy;
  
    setStrategy(strategy: ValidateLabelStrategy): void {
      this.strategy = strategy;
    }
  
    validate(value: number, currentFilter: Position, filter: Position): boolean {
      return this.strategy.validate(value, currentFilter, filter);
    }
  }