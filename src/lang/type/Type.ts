export type Type =
  | TypeVar
  | AnythingType
  | NothingType
  | BoolType
  | StringType
  | IntType
  | Float
  | Arrow
  | Union
  | IntTypeer
  | Tau

export type TypeVar = { kind: "TypeVar"; name: string }
export type AnythingType = { kind: "AnythingType" }
export type NothingType = { kind: "NothingType" }
export type BoolType = { kind: "BoolType" }
export type StringType = { kind: "StringType" }
export type IntType = { kind: "IntType" }
export type Float = { kind: "Float" }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
export type Union = { kind: "Union"; candidateTypes: Array<Type> }
export type IntTypeer = { kind: "IntTypeer"; aspectTypes: Array<Type> }
export type Tau = {
  kind: "Tau"
  elementTypes: Array<Type>
  attrTypes: Record<string, Type>
  restType?: Type
}

export function TypeVar(name: string): TypeVar {
  return { kind: "TypeVar", name }
}

export function AnythingType(): AnythingType {
  return { kind: "AnythingType" }
}

export function NothingType(): NothingType {
  return { kind: "NothingType" }
}

export function BoolType(): BoolType {
  return { kind: "BoolType" }
}

export function StringType(): StringType {
  return { kind: "StringType" }
}

export function IntType(): IntType {
  return { kind: "IntType" }
}

export function Float(): Float {
  return { kind: "Float" }
}

export function Arrow(argType: Type, retType: Type): Arrow {
  return { kind: "Arrow", argType, retType }
}

export function Union(candidateTypes: Array<Type>): Union {
  return { kind: "Union", candidateTypes }
}

export function IntTypeer(aspectTypes: Array<Type>): IntTypeer {
  return { kind: "IntTypeer", aspectTypes }
}

export function Tau(
  elementTypes: Array<Type>,
  attrTypes: Record<string, Type>,
  restType?: Type,
): Tau {
  return {
    kind: "Tau",
    elementTypes,
    attrTypes,
    restType,
  }
}
