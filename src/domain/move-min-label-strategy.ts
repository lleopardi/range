import { MoveBulletStrategy, MoveResult } from "./move-min-bullet-strategy";
import { Position } from "./models/position";

export class MoveMinLabelStrategy implements MoveBulletStrategy {
  move(
    value: number,
    translate: number,
    position: Position,
    filter: Position,
    currentFilter: Position
  ): MoveResult {
    
     const localPosition = { ...position, min: translate };
     const localFilter = { ...filter, min: value }; //este 
     const localCurrent = { ...currentFilter, min: value }; // y este deberian sen uno solo
     return {
       position: localPosition,
       filterValue: localFilter,
       current: localCurrent,
     };

  }
}

