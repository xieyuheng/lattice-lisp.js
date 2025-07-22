import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  // if (stmt.kind === "AssertSubtype") {
  //   if (checkSubtype(stmt.lhs, stmt.rhs)) {
  //     return
  //   }

  //   throw new Error(dedent`
  //     [assert-subtype] fail:
  //       lhs: ${formaType(stmt.lhs)}
  //       rhs: ${formaType(stmt.rhs)}
  //     `)
  // }
}
