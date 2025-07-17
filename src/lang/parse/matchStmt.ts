import * as X from "@xieyuheng/x-data.js"
import * as Stmts from "../stmt/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { matchType } from "./matchType.ts"

export function matchStmt(data: X.Data): Stmt {
  return X.match(stmtMatcher, data)
}

const stmtMatcher: X.Matcher<Stmt> = X.matcherChoice<Stmt>([
  X.matcher("(cons 'assert-subtype types)", ({ types }) =>
    Stmts.AssertSubtype(X.dataToArray(types).map(matchType)),
  ),

  X.matcher("(cons 'assert-not-subtype types)", ({ types }) =>
    Stmts.AssertNotSubtype(X.dataToArray(types).map(matchType)),
  ),
])
