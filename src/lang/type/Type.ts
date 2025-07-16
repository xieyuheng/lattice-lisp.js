export type Type =
  | TypeVar
  | Anything
  | Nothing
  | Str
  | Int
  | Float
  | Arrow
  | Union
  | Inter
  | Tau

export type TypeVar = { kind: "TypeVar"; name: string }
export type Anything = { kind: "Anything" }
export type Nothing = { kind: "Nothing" }
export type Str = { kind: "Str" }
export type Int = { kind: "Int" }
export type Float = { kind: "Float" }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
export type Union = { kind: "Union"; types: Array<Type> }
export type Inter = { kind: "Inter"; types: Array<Type> }
export type Tau = {
  kind: "Tau"
  elementTypes: Array<Type>
  attrTypes: Record<string, Type>
  restType?: Type
}

export function TypeVar(name: string): TypeVar {
  return { kind: "TypeVar", name }
}

export function Anything(): Anything {
  return { kind: "Anything" }
}

export function Nothing(): Nothing {
  return { kind: "Nothing" }
}

export function Str(): Str {
  return { kind: "Str" }
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

export function Union(types: Array<Type>): Union {
  return { kind: "Union", types }
}

export function Inter(types: Array<Type>): Inter {
  return { kind: "Inter", types }
}

export function Inter(
  elementTypes: Array<Type>,
  attrTypes: Record<string, Type>,
  restType?: Type,
): Inter {
  return {
    kind: "Tau",
    elementTypes,
    attrTypes,
    restType,
  }
}
