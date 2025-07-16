import { type Type } from "../type/index.ts"

type Ctx = {}

export function checkSubtype(ctx: Ctx, targetType: Type, superType: Type): boolean {
  if (targetType.kind === "Nothing") {
    return true
  }

  if (superType.kind === "Anything") {
    return true
  }

  if (
    (targetType.kind === "Bool" && superType.kind === "Bool") |
    (targetType.kind === "Str" && superType.kind === "Str") |
    (targetType.kind === "Int" && superType.kind === "Int") |
    (targetType.kind === "Float" && superType.kind === "Float")
  ) {
    return true
  }

  if (targetType.kind === "Arrow" && superType.kind === "Arrow") {
    return (
      checkSubtype(ctx, superType.argType, targetType.argType) &&
        checkSubtype(ctx, targetType.retType, superType.retType)
    )
  }

  return false
}
