import type { Mod } from "../mod/index.ts"
import type { Stmt } from "../stmt/index.ts"

export async function handleEffect(mod: Mod, stmt: Stmt): Promise<void> {
  // if (stmt.kind === "AssertEqual") {
  //   if (
  //     equal(
  //       evaluate(mod, emptyEnv(), stmt.lhs),
  //       evaluate(mod, emptyEnv(), stmt.rhs),
  //     )
  //   ) {
  //     return
  //   }
  //   throw new Error(dedent`
  //     [assert-equal] fail:
  //       lhs: ${formatExp(stmt.lhs)}
  //       rhs: ${formatExp(stmt.rhs)}
  //     `)
  // }
  // if (stmt.kind === "AssertNotEqual") {
  //   if (
  //     !equal(
  //       evaluate(mod, emptyEnv(), stmt.lhs),
  //       evaluate(mod, emptyEnv(), stmt.rhs),
  //     )
  //   ) {
  //     return
  //   }
  //   throw new Error(dedent`
  //     [assert-not-equal] fail:
  //       lhs: ${formatExp(stmt.lhs)}
  //       rhs: ${formatExp(stmt.rhs)}
  //     `)
  // }
}
