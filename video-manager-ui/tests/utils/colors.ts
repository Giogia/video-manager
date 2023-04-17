export function hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, "")

    if (hex.length === 3) hex = hex.replace(/(.)/g, "$1$1")

    const red = parseInt(hex.substring(0, 2), 16)
    const green = parseInt(hex.substring(2, 4), 16)
    const blue = parseInt(hex.substring(4, 6), 16)

    return `rgb(${red}, ${green}, ${blue})`
}