import { type Type } from "../type/index.ts"
import { type Ctx } from "./Ctx.ts"

export function checkSubtypeInCtx(
  ctx: Ctx,
  targetType: Type,
  superType: Type,
): boolean {
  if (targetType.kind === "NothingType") {
    return true
  }

  if (superType.kind === "AnythingType") {
    return true
  }

  if (
    (targetType.kind === "Bool" && superType.kind === "Bool") ||
    (targetType.kind === "Str" && superType.kind === "Str") ||
    (targetType.kind === "Int" && superType.kind === "Int") ||
    (targetType.kind === "Float" && superType.kind === "Float")
  ) {
    return true
  }

  if (targetType.kind === "Arrow" && superType.kind === "Arrow") {
    return (
      checkSubtypeInCtx(ctx, superType.argType, targetType.argType) &&
      checkSubtypeInCtx(ctx, targetType.retType, superType.retType)
    )
  }

  return false
}
