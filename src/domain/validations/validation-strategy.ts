import { Position } from "../models/position";

export interface ValidateLabelStrategy {
    validate(value: number, currentFilter: Position, filter: Position): boolean;
  }