import { recordMap } from "../../utils/record/recordMap.ts"
import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function unionlize(type: Type): Type {
  if (type.kind === "ListType") {
    return Types.ListType(unionlize(type.elementType))
  }

  if (type.kind === "Arrow") {
    return Types.Arrow(unionlize(type.argType), unionlize(type.retType))
  }

  if (type.kind === "Union") {
    return Types.Union(
      type.candidateTypes.map(unionlize).flatMap((candidateType) => {
        if (candidateType.kind === "Union") return candidateType.candidateTypes
        else return [candidateType]
      }),
    )
  }

  if (type.kind === "Inter") {
    // (inter (union A B C) D E)
    // =>
    // (union (inter A D E)
    //        (inter B D E)
    //        (inter C D E))
    const aspectTypes = type.aspectTypes.map(unionlize)
    const found = findNextUnion(aspectTypes)
    if (!found) return Types.Inter(aspectTypes)
    return unionlize(
      Types.Union(
        found.target.candidateTypes.map((candidateType) =>
          unionlize(
            Types.Inter([...found.prefix, candidateType, ...found.postfix]),
          ),
        ),
      ),
    )
  }

  if (type.kind === "Tau") {
    // TODO multi attribute tau should be viewed as
    // inter of single attribute taus.
    return Types.Tau(
      type.elementTypes.map(unionlize),
      recordMap(type.attributeTypes, unionlize),
      type.restType ? unionlize(type.restType) : undefined,
    )
  }

  return type
}

type NextUnionResult = {
  prefix: Array<Type>
  target: Types.Union
  postfix: Array<Type>
}

function findNextUnion(types: Array<Type>): undefined | NextUnionResult {
  const prefix = []
  const postfix = []
  let target: Types.Union | undefined = undefined
  for (const type of types) {
    if (!target && type.kind === "Union") {
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
