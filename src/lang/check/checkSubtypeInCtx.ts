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

  if (targetType.kind === "Tau" && superType.kind === "Tau") {
    if (targetType.elementTypes.length !== superType.elementTypes.length) {
      return false
    }

    for (const index of superType.elementTypes.keys()) {
      const targetElementType = targetType.elementTypes[index]
      const superElementType = superType.elementTypes[index]
      if (!checkSubtypeInCtx(ctx, targetElementType, superElementType)) {
        return false
      }
    }

    for (const key of Object.keys(superType.attributeTypes)) {
      const targetAttributeType = targetType.attributeTypes[key]
      if (targetAttributeType === undefined) return false
      const superAttributeType = superType.attributeTypes[key]
      if (!checkSubtypeInCtx(ctx, targetAttributeType, superAttributeType)) {
        return false
      }
    }

    return true
  }

  if (targetType.kind === "Union") {
    for (const candidateType of targetType.candidateTypes) {
      if (!checkSubtypeInCtx(ctx, candidateType, superType)) {
        return false
      }
    }

    return true
  }

  if (superType.kind === "Union") {
    for (const candidateType of superType.candidateTypes) {
      if (checkSubtypeInCtx(ctx, targetType, candidateType)) {
        return true
      }
    }

    return false
  }

  return false
}
