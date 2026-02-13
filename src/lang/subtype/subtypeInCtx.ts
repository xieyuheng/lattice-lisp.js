import { type Type } from "../type/index.ts"
import { type Ctx } from "./Ctx.ts"

export function subtypeInCtx(
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

  if (targetType.kind === "ListType" && superType.kind === "ListType") {
    return subtypeInCtx(ctx, targetType.elementType, superType.elementType)
  }

  if (targetType.kind === "Arrow" && superType.kind === "Arrow") {
    return (
      subtypeInCtx(ctx, superType.argType, targetType.argType) &&
      subtypeInCtx(ctx, targetType.retType, superType.retType)
    )
  }

  if (targetType.kind === "Tau" && superType.kind === "Tau") {
    if (targetType.elementTypes.length !== superType.elementTypes.length) {
      return false
    }

    for (const index of superType.elementTypes.keys()) {
      const targetElementType = targetType.elementTypes[index]
      const superElementType = superType.elementTypes[index]
      if (!subtypeInCtx(ctx, targetElementType, superElementType)) {
        return false
      }
    }

    for (const key of Object.keys(superType.attributeTypes)) {
      const targetAttributeType = targetType.attributeTypes[key]
      if (targetAttributeType === undefined) return false
      const superAttributeType = superType.attributeTypes[key]
      if (!subtypeInCtx(ctx, targetAttributeType, superAttributeType)) {
        return false
      }
    }

    return true
  }

  if (targetType.kind === "Union") {
    if (
      targetType.candidateTypes.every((candidateType) =>
        subtypeInCtx(ctx, candidateType, superType),
      )
    ) {
      return true
    }
  }

  if (superType.kind === "Inter") {
    if (
      superType.aspectTypes.every((aspectType) =>
        subtypeInCtx(ctx, targetType, aspectType),
      )
    ) {
      return true
    }
  }

  if (superType.kind === "Union") {
    if (
      superType.candidateTypes.some((candidateType) =>
        subtypeInCtx(ctx, targetType, candidateType),
      )
    ) {
      return true
    }
  }

  if (targetType.kind === "Inter") {
    if (
      targetType.aspectTypes.some((aspectType) =>
        subtypeInCtx(ctx, aspectType, superType),
      )
    ) {
      return true
    }
  }

  return false
}
