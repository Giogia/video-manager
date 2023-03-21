export function encodeName(name: string | undefined) {
   return name ?
      encodeURI(name) :
      ""
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
