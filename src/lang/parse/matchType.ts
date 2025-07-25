import * as X from "@xieyuheng/x-data.js"
import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function matchType(data: X.Data): Type {
  return X.match(typeMatcher, data)
}

const typeMatcher: X.Matcher<Type> = X.matcherChoice<Type>([
  X.matcher("'anything-t", () => Types.AnythingType()),
  X.matcher("'nothing-t", () => Types.NothingType()),
  X.matcher("'bool-t", () => Types.BoolType()),
  X.matcher("'string-t", () => Types.StringType()),
  X.matcher("'int-t", () => Types.IntType()),
  X.matcher("'float-t", () => Types.FloatType()),

  X.matcher("(cons '-> types)", ({ types }) =>
    X.dataToArray(types)
      .map(matchType)
      .reduceRight((retType, argType) => Types.Arrow(argType, retType)),
  ),

  X.matcher("(cons 'union types)", ({ types }) =>
    Types.Union(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'inter types)", ({ types }) =>
    Types.IntTypeer(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'tau types)", ({ types }) =>
    Types.Tau(X.dataToArray(types).map(matchType), {}),
  ),

  X.matcher("name", ({ name }) => Types.TypeVar(X.dataToString(name))),
])
