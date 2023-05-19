/**
 * Formats a number representing a size into a human-readable string with the appropriate unit.
 *
 * @param number - The number representing the size.
 * @param digits - The number of digits to include after the decimal point (default: 1).
 * @returns A formatted string representing the size with the appropriate unit.
 */
export const formatSize = (number = 0, digits = 1): string => {
    
   const sizes = [
      { value: 1e18, symbol: 'Eb' },
      { value: 1e15, symbol: 'Pb' },
      { value: 1e12, symbol: 'Tb' },
      { value: 1e9, symbol: 'Gb' },
      { value: 1e6, symbol: 'Mb' },
      { value: 1e3, symbol: 'kb' },
      { value: 1, symbol: 'b' },
   ]
    
   const size = sizes.find(({ value }) => number >= value)

   const regex = /\.0+$|(\.[0-9]*[1-9])0+$/

   return size ?
      (number / size.value)
         .toFixed(digits)
         .replace(regex, '$1') + size.symbol :
      '0b'
}