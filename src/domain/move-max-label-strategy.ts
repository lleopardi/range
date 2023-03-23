import { MoveBulletStrategy, MoveResult } from "./move-min-bullet-strategy";
import { Position } from "./models/position";

export class MoveMaxLabelStrategy implements MoveBulletStrategy {
  move(
    value: number,
    translate: number,
    position: Position,
    filter: Position,
    currentFilter: Position
  ): MoveResult {
    
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

