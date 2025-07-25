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
    (targetType.kind === "BoolType" && superType.kind === "BoolType") ||
    (targetType.kind === "StringType" && superType.kind === "StringType") ||
    (targetType.kind === "IntType" && superType.kind === "IntType") ||
    (targetType.kind === "FloatType" && superType.kind === "FloatType")
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
