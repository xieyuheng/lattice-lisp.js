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
    // There can not be union under inter.
    // TODO handle union under inter
    const aspectTypes = type.aspectTypes.map(unionlize)
    return Types.Inter(aspectTypes)
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

function pickNextUnion(types: Array<Type>): [Type | undefined, Array<Type>] {
  const remainingTypes = []
  let nextUnion: Type | undefined = undefined
  for (const type of types) {
    if (type.kind === "Union" && nextUnion === undefined) {
      nextUnion = type
    } else {
      remainingTypes.push(type)
    }
  }

  return [nextUnion, remainingTypes]
}
