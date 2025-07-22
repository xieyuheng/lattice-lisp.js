import * as X from "@xieyuheng/x-data.js"
import * as Stmts from "../stmt/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { matchType } from "./matchType.ts"

export function matchStmt(data: X.Data): Stmt {
  return X.match(stmtMatcher, data)
}

const stmtMatcher: X.Matcher<Stmt> = X.matcherChoice<Stmt>([
  X.matcher("`(assert-subtype ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertSubtype(matchType(lhs), matchType(rhs)),
  ),

  X.matcher("`(assert-not-subtype ,lhs ,rhs)", ({ lhs, rhs }) =>
    Stmts.AssertNotSubtype(matchType(lhs), matchType(rhs)),
  ),
])
