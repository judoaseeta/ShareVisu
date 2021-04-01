export function checkIsNumOrFraction(rawData: string) {
   return !isNaN(parseFloat(rawData));
}

export function checkIsDate(raw: string) {
   const regex = new RegExp(/()-[0-1]{1}[0-3]{1}[1-9]{1}/)
}

export function checkIsKeySelected(key: string|undefined) {
   return key && key !== '-';
}