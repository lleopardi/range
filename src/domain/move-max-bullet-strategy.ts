import { MoveBulletStrategy, MoveResult } from "./move-min-bullet-strategy";
import { Position } from "./models/position";

export class MoveMaxBulletStrategy implements MoveBulletStrategy {
  move(
    value: number,
    translate: number,
    position: Position,
    filter: Position,
    currentFilter: Position
  ): MoveResult {
    if (value <= currentFilter.min) return;
    const localPosition = { ...position, max: translate };
    const localFilter = { ...filter, max: value };
    const localCurrent = { ...currentFilter, max: value };
    return {
      position: localPosition,
      filterValue: localFilter,
      current: localCurrent,
    };

  }
}

