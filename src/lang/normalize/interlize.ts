import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function interlize(type: Type): Type {
  if (type.kind === "ListType") {
    return Types.ListType(interlize(type.elementType))
  }

  if (type.kind === "Arrow") {
    return Types.Arrow(interlize(type.argType), interlize(type.retType))
  }

  if (type.kind === "Union") {
    // (union (union)) => (union)
    const candidateTypes = flattenUnion(type.candidateTypes)
    if (candidateTypes.length === 1) return candidateTypes[0]
    return Types.Union(candidateTypes)
  }

  if (type.kind === "Inter") {
    // (inter (inter)) => (inter)
    const aspectTypes = flattenInter(type.aspectTypes)
    if (aspectTypes.length === 1) return aspectTypes[0]
    return Types.Inter(aspectTypes)
  }

  // TODO

  return type
}

function flattenUnion(types: Array<Type>): Array<Type> {
  return types.map(interlize).flatMap((type) => {
    if (type.kind === "Union") return type.candidateTypes
    else return [type]
  })
}

function flattenInter(types: Array<Type>): Array<Type> {
  return types.map(interlize).flatMap((type) => {
    if (type.kind === "Inter") return type.aspectTypes
    else return [type]
  })
}
