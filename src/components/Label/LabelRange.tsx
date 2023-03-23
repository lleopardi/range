import React, { BaseSyntheticEvent, MouseEvent, useState } from "react";
import { Position } from "../../domain/models/position";
import { ValidateMaxLabelStrategy } from "../../domain/validations/validation-max-label-strategy";
import { ValidateMinLabelStrategy } from "../../domain/validations/validation-min-label-strategy";
import { ValidateLabel } from "../../domain/validations/validations-labels";
import "./LabelRange.scss";


const strategies = {
  maxLabel: ValidateMaxLabelStrategy,
  minLabel: ValidateMinLabelStrategy,
};

const validateLabel = new ValidateLabel();

interface LabelRangeProps {
  value: number;
  unit: string;
  isEditable: boolean;
  onUpdateLabel: (internalValue: number, type: "minLabel" | "maxLabel") => any;
  alignContentEditable: "left" | "right";
  type: "minLabel" | "maxLabel";
  currentFilter: Position;
  filter: Position;
}

const LabelRange = ({
  value,
  unit,
  isEditable,
  onUpdateLabel,
  alignContentEditable,
  type,
  currentFilter,
  filter,
}: LabelRangeProps) => {
  const [tempValue, setTempValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handlerChange = (event: BaseSyntheticEvent) => {
    const { value } = event.target;

    setTempValue(value);
    event.preventDefault();
  };

  const onBlur = () => {
    const isInValidValue = validateLabel.validate(
      tempValue,
      currentFilter,
      filter
    );
    if (isInValidValue) {
      setIsInvalid(true);
    } else {
      setNewValue();
    }
  };

  const onSubmit = (event: BaseSyntheticEvent) => {
    const isInValidValue = validateLabel.validate(
      tempValue,
      currentFilter,
      filter
    );
    if (isInValidValue) {
      setIsInvalid(true);
    } else {
      setNewValue();
    }
    event.preventDefault();
  };

  const onClickLabel = (event: MouseEvent<HTMLDivElement>) => {
    
    validateLabel.setStrategy(new strategies[type]());
    setIsEditing(true);
    setTempValue(value);
  };

  const setNewValue = () => {
    if(isEditing){
      onUpdateLabel(tempValue, type);
    // realizar la actualizacion
    setIsEditing(false);
    setIsInvalid(false);
    }
    
  };

  const renderLabel = () => {
    if (isEditable && isEditing) {
      return (
        <form onSubmit={onSubmit}>
          <input
            data-testid="input-range"
            className={isInvalid ? "error" : ""}
            autoFocus
            type="number"
            role="textbox"
            value={tempValue}
            onChange={handlerChange}
            onBlur={onBlur}
            style={{
              textAlign: alignContentEditable,
            }}
          />
        </form>
      );
    }

    return (
      <div
        className="label-range"
        onClick={onClickLabel}
        data-testid="label-range"
      >{`${value} ${unit}`}</div>
    );
  };

  return renderLabel();
};

export default LabelRange;
