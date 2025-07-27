import { type Type } from "../type/index.ts"
import { checkSubtype } from "./checkSubtype.ts"

export function checkTypeEqual(lhs: Type, rhs: Type): boolean {
  return checkSubtype(lhs, rhs) && checkSubtype(rhs, lhs)
}
