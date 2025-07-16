import { type Type } from "../type/index.ts"

export function checkSubtype( targetType: Type, superType: Type): boolean {
  if (targetType.kind === "Nothing") {
    return true
  }

  if (superType.kind === "Anything") {
    return true
  }

  return false
}
