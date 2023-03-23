import { MoveBullet } from "../domain/move-bullet";
import { MoveMaxBulletStrategy } from "../domain/move-max-bullet-strategy";
import { MoveMaxLabelStrategy } from "../domain/move-max-label-strategy";
import { MoveMinBulletStrategy } from "../domain/move-min-bullet-strategy";
import { MoveMinLabelStrategy } from "../domain/move-min-label-strategy";

export const offset = 10; // deberia ser el bullet/2

/**
 * Returna los valores minimos y maximos del filtro
 * @param range Objeto de la forma {min: number, max: number} o array de enteros
 * @returns Objeto de la forma {min: number, max: number} que representa el mayor y menor numero del filtro
 */
export const getMaxAndMinValues = (range: any): {min: number, max: number} => {
  if (Array.isArray(range)) {
    const max = range[range.length - 1];
    const min = range[0];
    return {
      min,
      max,
    };
  }
  return range;
};

export const getBoundaries = (ref: HTMLElement) => {
  const {x, right, width} = ref.getBoundingClientRect();

  const min = x - offset;
  const max = right + min;

  return {
    min,
    max,
    width,
  };
};

/**
 * retorna la cantidad de pixeles a desplazar el bullet en la linea, de acuerdo al desplazamiendo del puntero en el viewport
 * @param clientX posicion en x del puntero de acuerdo al viewport
 * @param startPosition valor minimo de la linea en el eje x
 * @returns cantidad de pixeles a desplazar el bullet
 */
export const getTranslate = (clientX: number, startPosition: number) => {
  return Math.round(clientX - startPosition - offset * 2);
};

/**
 * Retorna el valor real del elemento de acuerdo a su posicion en la linea
 * @param filter valor real maximo y minimo permitido, filter puede ser un array de elementos
 * @param width ancho de la linea contenedora de los bullets
 * @param translate cantidad de pixeles desplazados en la linea
 * @returns 
 */
export const getFilterValue = (
  filter: { min: number; max: number },
  width: number,
  translate: number
) => {
  if(Array.isArray(filter)){
    const items = filter.length - 1;
    const block = width / items;
    const idx = Math.abs(Math.round(translate / block));
    return filter[idx];
  }

  const value =
    filter.min + ((translate + offset) * (filter.max - filter.min)) / width;
  return Math.round(value);
};

export const getPositionFromLabel = (
    filter: { min: number; max: number },
    width: number,
    value: number
) => {
    const translate = (((value - filter.min) * width)/(filter.max - filter.min)) - offset;
    return translate;
}

/**
 * returna una estrategia para mover el bullet 
 * @param type min | max  representa el bullet minimo o maximo
 * @returns 
 */
export const getMoveStrategy = (type: 'min' | 'max' | 'minLabel' | 'maxLabel') => {
  const strategies = {
    min: new MoveMinBulletStrategy(),
    max: new MoveMaxBulletStrategy(),
    minLabel: new MoveMinLabelStrategy(),
    maxLabel: new MoveMaxLabelStrategy()
  }

  const strategy = strategies[type]

  const move = new MoveBullet()
  move.setStrategy(strategy)

  return move;
}

/**
 * Verifica si el bullet se encuentra dentro de los limites de la linea de desplazamiento
 * @param translate movimiento del bullet en la linea
 * @param width ancho de la linea
 * @param offset espacio extra a la derecha para centrar los bullets
 * @returns 
 */
export const isOutOfLimits = (translate: number, width: number) => {
  return (translate < -offset || translate > width - offset)
}