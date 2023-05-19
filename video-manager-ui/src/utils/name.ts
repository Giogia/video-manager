/**
 * Capitalizes the first letter of a word.
 * 
 * @param word - The word to capitalize.
 * @returns The word with the first letter capitalized.
 */
export const capitalize = (word: string): string =>
   word.charAt(0).toUpperCase() +
    word.slice(1)

/**
* Formats a text by capitalizing the first letter of each word and replacing hyphens with spaces.
* 
* @param text - The text to format.
* @returns The formatted text with capitalized words and hyphens replaced with spaces.
*/
export const formatName = (text: string): string => text
   .split('-')
   .map((word: string) => capitalize(word))
   .join(' ')