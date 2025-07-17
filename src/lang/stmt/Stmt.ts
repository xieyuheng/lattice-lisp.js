import { type Type } from "../type/index.ts"

export type Stmt = AssertSubtype | AssertNotSubtype
export type AssertSubtype = { kind: "AssertSubtype"; types: Array<Type> }
export type AssertNotSubtype = { kind: "AssertNotSubtype"; types: Array<Type> }

export function AssertSubtype(types: Array<Type>): AssertSubtype {
  return {
    kind: "AssertSubtype",
    types,
  }
}

export function AssertNotSubtype(types: Array<Type>): AssertNotSubtype {
  return {
    kind: "AssertNotSubtype",
    types,
  }
}
