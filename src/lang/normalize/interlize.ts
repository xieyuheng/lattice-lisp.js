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
    const candidateTypes = flattenUnion(type.candidateTypes)
    if (candidateTypes.length === 1) return candidateTypes[0]
    return Types.Union(candidateTypes)
  }

  // TODO

  return type
}

function flattenUnion(types: Array<Type>): Array<Type> {
  // (union (union)) => (union)
  return types.map(interlize).flatMap((type) => {
    if (type.kind === "Union") return type.candidateTypes
    else return [type]
  })
}

function flattenInter(types: Array<Type>): Array<Type> {
  // (inter (inter)) => (inter)
  return types.map(interlize).flatMap((type) => {
    if (type.kind === "Inter") return type.aspectTypes
    else return [type]
  })
}
