import * as Types from "../type/index.ts"
import { type Tau, type Type } from "../type/index.ts"
import { type Ctx } from "./Ctx.ts"

export function subtypeInCtx(
  ctx: Ctx,
  targetType: Type,
  superType: Type,
): boolean {
  if (targetType.kind === "Tau" && !tauIsGenerator(targetType)) {
    targetType = interlizeTau(targetType)
  }

  if (superType.kind === "Tau" && !tauIsGenerator(superType)) {
    superType = interlizeTau(superType)
  }

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

  // equivalent transformation

  if (targetType.kind === "Union") {
    return targetType.candidateTypes.every((candidateType) =>
      subtypeInCtx(ctx, candidateType, superType),
    )
  }

  // equivalent transformation

  if (superType.kind === "Inter") {
    return superType.aspectTypes.every((aspectType) =>
      subtypeInCtx(ctx, targetType, aspectType),
    )
  }

  return false
}

function tauIsGenerator(tau: Tau): boolean {
  if (Object.keys(tau.attributeTypes).length === 0) {
    return true
  }

  if (
    Object.keys(tau.attributeTypes).length === 1 &&
    tau.elementTypes.length === 0
  ) {
    return true
  }

  return false
}

function interlizeTau(tau: Tau): Type {
  // (tau A ...) => (inter (tau A) ...)
  // (tau A B :x C :y D)
  // =>
  // (inter (tau A B)
  //        (tau :x C)
  //        (tau :y D))

  const aspectTypes = Object.entries(tau.attributeTypes).map(
    ([key, attributeType]) => Types.Tau([], { [key]: attributeType }),
  )

  if (tau.elementTypes.length !== 0) {
    aspectTypes.push(Types.Tau(tau.elementTypes, {}))
  }

  if (aspectTypes.length === 1) {
    return aspectTypes[0]
  } else {
    return Types.Inter(aspectTypes)
  }
}
