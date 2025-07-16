export type Type = TypeVar | Anything | Nothing | Str | Int | Float | Arrow
export type TypeVar = { kind: "TypeVar"; name: string }
export type Anything = { kind: "Anything" }
export type Nothing = { kind: "Nothing" }
export type Str = { kind: "Str" }
export type Int = { kind: "Int" }
export type Float = { kind: "Float" }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
