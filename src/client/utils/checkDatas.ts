export function checkIsNumOrFraction(rawData: string) {
   return !isNaN(parseFloat(rawData));
}