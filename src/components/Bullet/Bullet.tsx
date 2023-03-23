import React, { useState, DragEvent,MouseEvent } from 'react';
import './Bullet.scss';


interface BulletProps {
    onDrag: (event: DragEvent<HTMLDivElement>) => void,
    onDragEnd: (event: DragEvent<HTMLDivElement>) => void,
    onMouseDown: (event: MouseEvent<HTMLDivElement>) => void,
    position: number,
    id: 'min' | 'max'
}

const Bullet = ({ onDrag, onDragEnd, position, id, onMouseDown }: BulletProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlerOnMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setIsPressed(true);
        onMouseDown(event);
    }

    const handlerOnMouseMove = (event: React.DragEvent<HTMLDivElement>) => {
        if(isPressed){
            onDrag(event);
        }
    }

    const handlerOnMouseUp = (event: React.DragEvent<HTMLDivElement>) => {
        setIsPressed(false);
        onDragEnd(event);
    }

    const handlerOnMouseEnter = (event: React.DragEvent<HTMLDivElement>) => {
        setIsPressed(false);
    }

    const handlerOnMouseLeave = (event: React.DragEvent<HTMLDivElement>) => {
        onDragEnd(event);
    }

    return (
        <div
            id={id}
            className="bullet"
            data-testid="bullet"
            onMouseDown={handlerOnMouseDown}
            onMouseMove={handlerOnMouseMove}
            onMouseUp={handlerOnMouseUp}
            onMouseEnter={handlerOnMouseEnter}
            onMouseLeave={handlerOnMouseLeave}
            style={{
                left: `${position}px`
            }}>
        </div>
    );
}

export default Bullet;
