/**
 * Возвращает число из диапазона
 *
 */
const clamp = (min: number, value: number, max: number) => Math.max(Math.min(value, max), min);

export default clamp;
