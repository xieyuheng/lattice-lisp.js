import * as X from "@xieyuheng/x-data.js"
import * as Types from "../type/index.ts"
import { type Type } from "../type/index.ts"

export function matchType(data: X.Data): Type {
  return X.match(typeMatcher, data)
}

const typeMatcher: X.Matcher<Type> = X.matcherChoice<Type>([
  X.matcher("'anything-t", () => Types.Anything()),
  X.matcher("'nothing-t", () => Types.Nothing()),
  X.matcher("'bool-t", () => Types.Bool()),
  X.matcher("'string-t", () => Types.Str()),
  X.matcher("'int-t", () => Types.Int()),
  X.matcher("'float-t", () => Types.Float()),

  X.matcher("(cons 'union types)", ({ types }) =>
    Types.Union(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'inter types)", ({ types }) =>
    Types.Inter(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("name", ({ name }) => Types.TypeVar(X.dataToString(name))),
])
