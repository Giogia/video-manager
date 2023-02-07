export const SPACE = " "
export const EMPTY = ""

export function formatName(name: string | undefined) {
    return name ?
        name.replaceAll(SPACE, EMPTY).toLowerCase() :
        EMPTY
}

export function increaseNumber(name: string) {
    if (!name) return name

    const number = parseInt(name?.slice(-1))

    return !isNaN(number) ?
        name.slice(0, -1) + (number + 1) :
        name + " " + 1
}

export function startsWith(name: string) {
    return new RegExp(`^${name}`)
}
