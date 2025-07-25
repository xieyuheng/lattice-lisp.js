import { type Type } from "../type/index.ts"
import { checkSubtypeInCtx } from "./checkSubtypeInCtx.ts"
import { emptyCtx } from "./Ctx.ts"

export function checkSubtype(targetType: Type, superType: Type): boolean {
  return checkSubtypeInCtx(emptyCtx(), targetType, superType)
}
