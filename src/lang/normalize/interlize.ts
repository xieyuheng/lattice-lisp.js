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
    // (union (inter)) => (inter (union))
    const found = findNextInter(candidateTypes)
    if (!found) return Types.Union(candidateTypes)
    return interlize(
      Types.Inter(
        found.target.aspectTypes.map((aspectType) =>
          interlize(
            Types.Union([...found.prefix, aspectType, ...found.postfix]),
          ),
        ),
      ),
    )
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

type NextInterResult = {
  prefix: Array<Type>
  target: Types.Inter
  postfix: Array<Type>
}

function findNextInter(types: Array<Type>): undefined | NextInterResult {
  const prefix = []
  const postfix = []
  let target: Types.Inter | undefined = undefined
  for (const type of types) {
    if (!target && type.kind === "Inter") {
      target = type
    } else if (!target) {
      prefix.push(type)
    } else {
      postfix.push(type)
    }
  }

  if (target) return { prefix, target, postfix }
  else undefined
}
