export function encodeName(name: string | undefined) {
   return name ?
      encodeURI(name) :
      ""
}

export function getLastDigits(name: string) {

   const digits = name?.match(/\d+$/)?.[0] || ""
   const position = name?.lastIndexOf(digits)

   return {
      number: parseInt(digits),
      position
   }
}

export function increaseNumber(name: string) {
   if (!name) return name

   const { number, position } = getLastDigits(name)

   return isNaN(number) ?
      name + " " + 1 :
      name.slice(0, position) + (number + 1)
}

export function startsWith(name: string) {
   return new RegExp(`^${name}`)
}
