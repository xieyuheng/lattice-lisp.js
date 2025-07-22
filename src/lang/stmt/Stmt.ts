import { type Type } from "../type/index.ts"

export type Stmt = AssertSubtype | AssertNotSubtype
export type AssertSubtype = { kind: "AssertSubtype"; lhs: Type, rhs: Type }
export type AssertNotSubtype = { kind: "AssertNotSubtype"; lhs: Type, rhs: Type }

export function AssertSubtype(lhs: Type, rhs: Type): AssertSubtype {
  return {
    kind: "AssertSubtype",
    lhs, rhs,
  }
}

export function AssertNotSubtype(lhs: Type, rhs: Type): AssertNotSubtype {
  return {
    kind: "AssertNotSubtype",
    lhs, rhs,
  }
}
