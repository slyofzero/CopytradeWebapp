export function roundUpToDecimalPlace(
  number: string | number | undefined,
  decimalPlaces: number
) {
  number = Number(number || 0);

  const factor = 10 ** decimalPlaces;
  return Math.ceil(number * factor) / factor;
}
