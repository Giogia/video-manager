
export const capitalize = (word: string): string =>
    word.charAt(0).toUpperCase() +
    word.slice(1)

export const formatName = (text: string): string => text
    .split('-')
    .map((word: string) => capitalize(word))
    .join(' ')