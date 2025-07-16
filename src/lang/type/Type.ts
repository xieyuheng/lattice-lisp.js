export type Type = TypeVar | Anything | Nothing | Arrow
export type TypeVar = { kind: "TypeVar"; name: string }
export type Anything = { kind: "Anything" }
export type Nothing = { kind: "Nothing" }
export type Arrow = { kind: "Arrow"; argType: Type; retType: Type }
