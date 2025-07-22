import dedent from "dedent"
import { checkSubtype } from "../check/checkSubtype.ts"
import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"
import { formaType } from "../format/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "AssertSubtype") {
    if (checkSubtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(dedent`
      [assert-subtype] fail:
        lhs: ${formaType(stmt.lhs)}
        rhs: ${formaType(stmt.rhs)}
      `)
  }

  if (stmt.kind === "AssertNotSubtype") {
    if (!checkSubtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(dedent`
      [assert-not-subtype] fail:
        lhs: ${formaType(stmt.lhs)}
        rhs: ${formaType(stmt.rhs)}
      `)
  }
}
