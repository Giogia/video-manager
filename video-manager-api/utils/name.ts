export function encodeName(name: string | undefined) {
   return name ?
      encodeURI(name) :
      ""
}

export function getLastDigits(name: string) {

   const digits = name?.match(/\d+$/)?.[0] || "0"

   return parseInt(digits)
}

export function firstMissingName(name: string, names: string[]) {

   const numbers = names
      .map(name => getLastDigits(name))
      .sort((a, b) => a - b)

   const [start] = numbers.slice(0)
   const [end] = numbers.slice(-1)

   const index = numbers.findIndex((number, i) => number !== start + i)
   const number = index > 0 ? index : end + 1

   return [name, number].join(" ")
}

export function startsWith(name: string) {
   return new RegExp(`^${name}`)
}
