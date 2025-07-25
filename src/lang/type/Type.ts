export type Type =
  | TypeVar
  | AnythingType
  | NothingType
  | BoolType
  | StringType
  | Int
  | Float
  | Arrow
  | Union
  | Inter
  | Tau

export type TypeVar = { kind: "TypeVar"; name: string }
export type AnythingType = { kind: "AnythingType" }
export type NothingType = { kind: "NothingType" }
export type BoolType = { kind: "BoolType" }
export type StringType = { kind: "StringType" }
export type Int = { kind: "Int" }
export type Float = { kind: "Float" }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
export type Union = { kind: "Union"; candidateTypes: Array<Type> }
export type Inter = { kind: "Inter"; aspectTypes: Array<Type> }
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

export function Int(): Int {
  return { kind: "Int" }
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

export function Inter(aspectTypes: Array<Type>): Inter {
  return { kind: "Inter", aspectTypes }
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
