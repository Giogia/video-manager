/**
 * Encodes the provided name using the `encodeURI` function if it is defined, otherwise returns an empty string.
 * @param name - The name to encode.
 * @returns The encoded name or an empty string if the name is undefined.
 */
export function encodeName(name: string | undefined): string {
   return name ?
      encodeURI(name) :
      ""
}

/**
 * Retrieves the last digits from the provided name using a regular expression, and parses them as an integer.
 * If no digits are found, returns 0.
 * @param name - The name from which to extract the last digits.
 * @returns The last digits of the name as an integer.
 */
export function getLastDigits(name: string): number {
   const digits = name?.match(/\d+$/)?.[0] || "0"

   return parseInt(digits)
}

/**
 * Finds the first missing number within the provided array of names based on their last digits.
 * @param name - The base name to be checked.
 * @param names - The array of names to search for missing numbers.
 * @returns The first missing name in the format "[name] [number]".
 */
export function firstMissingName(name: string, names: string[]): string {
   const numbers = names
      .map(name => getLastDigits(name))
      .sort((a, b) => a - b)

   const [start] = numbers.slice(0)
   const [end] = numbers.slice(-1)

   const index = numbers.findIndex((number, i) => number !== start + i)
   const number = index > 0 ? index : end + 1

   return [name, number].join(" ")
}

/**
 * Generates a regular expression that matches strings starting with the provided name.
 * @param name - The starting name to generate the regular expression for.
 * @returns A regular expression that matches strings starting with the specified name.
 */
export function startsWith(name: string): RegExp {
   return new RegExp(`^${name}`)
}
