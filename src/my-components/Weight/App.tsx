export function convertToStandardWeight(weight: number): string {
  if (weight < 1000) {
    return weight + " " + "gm";
  }
  const toFloatingPoint = weight / 1000;
  return toFloatingPoint.toPrecision(3) + " " + "kg";
}
