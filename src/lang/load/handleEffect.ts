import { checkSubtype, checkTypeEqual } from "../check/index.ts"
import { formaType } from "../format/index.ts"
import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  if (stmt.kind === "AssertSubtype") {
    if (checkSubtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-subtype] fail:\n` +
        `  lhs: ${formaType(stmt.lhs)}\n` +
        `  rhs: ${formaType(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotSubtype") {
    if (!checkSubtype(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-not-subtype] fail:\n` +
        `  lhs: ${formaType(stmt.lhs)}\n` +
        `  rhs: ${formaType(stmt.rhs)}`,
    )
  }

  if (stmt.kind === "AssertTypeEqual") {
    if (checkTypeEqual(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-type-equal] fail:\n` +
        `  lhs: ${formaType(stmt.lhs)}\n` +
        `  rhs: ${formaType(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotTypeEqual") {
    if (!checkTypeEqual(stmt.lhs, stmt.rhs)) {
      return
    }

    throw new Error(
      `[assert-not-type-equal] fail:\n` +
        `  lhs: ${formaType(stmt.lhs)}\n` +
        `  rhs: ${formaType(stmt.rhs)}\n`,
    )
  }
}
