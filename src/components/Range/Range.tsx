import React, { useState, DragEvent, MouseEvent } from "react";
import "./Range.scss";

import {
  getBoundaries,
  getFilterValue,
  getMaxAndMinValues,
  getMoveStrategy,
  getPositionFromLabel,
  getTranslate,
  isOutOfLimits,
  offset,
} from "../../utils/utils";
import Bullet from "../Bullet/Bullet";
import LabelRange from "../Label/LabelRange";
import Line from "../Line/Line";
import { MoveBullet } from "../../domain/move-bullet";

interface filterNormal {
  min: number;
  max: number;
}

interface RangeProps {
  filter: { min: number; max: number };
  label: string;
  onFilter: (filter: filterNormal) => void;
}

let moveBullet: MoveBullet;

const Range = ({ filter, label, onFilter }: RangeProps) => {
  const [wasInit, setWasInit] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({ min: 0, max: 0 }); // esto es hecho debido a que puede ser array u objeto
  const [realBoundary, setRealBoundary] = useState({
    min: 0,
    max: 0,
    width: 0,
  }); // limites en el viewport, se refiere a la informaxion de la linea
  const [newCurrentPosition, setNewCurrentPosition] = useState({
    min: 0,
    max: 0,
  }); // usado para mover los bullets, son pixeles para mover de forma absoluta en la linea
  const [newFilterValue, setNewFilterValue] = useState({ min: 0, max: 0 }); // es el valor del filtro seleccionado al mover los bullets

  const getNewInitialParams = (line: HTMLElement) => {
    if (line && !wasInit) {
      setWasInit(true);
      const boundary = getBoundaries(line);
      const minAndMaxValues = getMaxAndMinValues(filter);
      setCurrentFilter(minAndMaxValues);
      setRealBoundary({ ...boundary });
      setNewCurrentPosition({ min: -offset, max: boundary.width - offset });
    }
  };

  const onNewDrag = (event: DragEvent<HTMLDivElement>) => {
    const { clientX } = event;
    let position = null;
    let filterValue = null;
    let current = null;

    const translate = getTranslate(clientX, realBoundary.min);
    const outOfLimits = isOutOfLimits(translate, realBoundary.width);
    if (outOfLimits) return;
    const value = getFilterValue(filter, realBoundary.width, translate);

    const result = moveBullet.move(
      value,
      translate,
      newCurrentPosition,
      newFilterValue,
      currentFilter
    );

    if (!result || typeof result === "boolean") return;

    position = { ...result.position };
    filterValue = { ...result.filterValue };
    current = { ...result.current };

    setNewCurrentPosition(position);
    setNewFilterValue(filterValue);
    setCurrentFilter(current);
    event.preventDefault();
  };


  const onNewChangeLabel = (value: number, type: "minLabel" | "maxLabel" ) => {
    moveBullet = getMoveStrategy(type);

    let position = null;
    let filterValue = null;
    let current = null;
    const translate = getPositionFromLabel(
      filter,
      realBoundary.width,
      value
    );

    const result = moveBullet.move(
      value,
      translate,
      newCurrentPosition,
      newFilterValue,
      currentFilter
    );

    console.log("result", result);
    if (!result) return;

    position = { ...result.position };
    filterValue = { ...result.filterValue };
    current = { ...result.current };

    setNewCurrentPosition(position);
    setNewFilterValue(filterValue);
    setCurrentFilter(current);
    onFilter(current);
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    onFilter(currentFilter);
    event.preventDefault();
  };

  const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget;
    moveBullet = getMoveStrategy(id as "min" | "max");
  };

  const isEditable = () => !Array.isArray(filter);


  return (
    <div className="range">
      <LabelRange
        value={currentFilter.min}
        unit={label}
        isEditable={isEditable()}
        onUpdateLabel={(value: number, type: "minLabel" | "maxLabel") => onNewChangeLabel(value, type)}
        alignContentEditable="right"
        type="minLabel"
        currentFilter={currentFilter}
        filter={filter}
        
      />

      <Line setup={getNewInitialParams}>
        <Bullet
          id={"min"}
          onDrag={onNewDrag}
          onDragEnd={onDragEnd}
          onMouseDown={onMouseDown}
          position={newCurrentPosition.min}
        />
        <Bullet
          id={"max"}
          onDrag={onNewDrag}
          onDragEnd={onDragEnd}
          onMouseDown={onMouseDown}
          position={newCurrentPosition.max}
        />
      </Line>
      <LabelRange
        value={currentFilter.max}
        unit={label}
        isEditable={isEditable()}
        onUpdateLabel={(value: number, type: "maxLabel" | "maxLabel") => onNewChangeLabel(value, type)}
        // onUpdateLabel={onNewChangeLabel("maxLabel")}
        alignContentEditable="left"
        type="maxLabel"
        currentFilter={currentFilter}
        filter={filter}
        
      />
    </div>
  );
};

export default Range;
