import { offset } from "../utils/utils";
import { Position } from "./models/position";

export interface MoveBulletStrategy {
  move(
    value: number,
    translate: number,
    position: Position,
    filter: Position,
    currentFilter: Position
  ): MoveResult;
}

export interface MoveResult {
  position: Position;
  filterValue: Position;
  current: Position;
}

export class MoveMinBulletStrategy implements MoveBulletStrategy {
  move(
    value: number,
    translate: number,
    position: Position,
    filter: Position,
    currentFilter: Position
  ): MoveResult {
    if (translate < -offset)return 
    if (value >= currentFilter.max) return;
    const localPosition = { ...position, min: translate };
    const localFilter = { ...filter, min: value };
    const localCurrent = { ...currentFilter, min: value };

    return {
      position: localPosition,
      filterValue: localFilter,
      current: localCurrent,
    };

  }
}
