import { MoveBulletStrategy, MoveResult } from "./move-min-bullet-strategy";
import { Position } from "./models/position";

export class MoveBullet {
    private strategy: MoveBulletStrategy

    setStrategy(strategy: MoveBulletStrategy): void {
        this.strategy = strategy
    }

    move(value: number, translate: number, position: Position, filter: Position, currentFilter: Position): MoveResult {
        return this.strategy.move(value, translate, position, filter, currentFilter)
    }
}