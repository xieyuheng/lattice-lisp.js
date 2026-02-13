# project failed

> fail faster -- try the simple but maybe wrong solution first!

为什么 `unionlize(targetType)` 和 `interlize(superType)` 是正确的？

- 两边都 `unionlize` 也可以。
- 两边都 `interlize` 也可以。
- 左边 `interlize` 右边 `unionlize` 不行。

```typescript
export function subtype(targetType: Type, superType: Type): boolean {
  return subtypeInCtx(emptyCtx(), unionlize(targetType), interlize(superType))
}
```

# original plan

(1) finite structural type
(2) recursive structural type
(2) recursive structural type + polymorphism

- use lattice-lisp as the denotational semantics of lattice-lisp, specially for type system
  - maybe use explicit substitution for runtime semantics
- use the idea of combinators -- by putting env and ctx to the last currying argument position.
- use the idea of propagator model to implement type system.
- implement `not` as type operator, which is needed to view pattern in pattern matching as type.

# define type

add a kind of `Def`
`define-type` stmt
load handle `define-type`

# recursive type

`subtype` -- take `ctx.trail`
`subtype` -- support recursive type

# literal type

`Literal` -- has `data`

test ADT by literal string type

# tau*

`subtype` -- `Tau` -- handle `Tau` as `restTypes`
`subtype` -- `Tau` -- handle `ListType` as `restTypes`

# union and inter

fix edge cases.

# type check error report

`subtype` -- has `ctx.history` and return `Report`

- for error report in `assert-subtype`

# format

`formaType` -- handle `Arrow` well
