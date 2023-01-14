
export const increaseNumber = (name: string | undefined) => {
    if (!name) return name

    const number = parseInt(name?.slice(-1))

    return !isNaN(number) ?
        name.slice(0, -1) + (number + 1) :
        name + " " + 1
}