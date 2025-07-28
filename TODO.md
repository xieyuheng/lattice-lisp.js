`normal-form/unionlize`

`unionlize` stmt

`normal-form/interlize`

`interlize` stmt

# recursive type

`define-type`

`checkSubtype` -- take `ctx.trail`
`checkSubtype` -- support recursive type

# literal type

`Literal` -- has `data`

test ADT by literal string type

# tau*

`checkSubtype` -- `Tau` -- handle `Tau` as `restTypes`
`checkSubtype` -- `Tau` -- handle `ListType` as `restTypes`

# union and inter

fix edge cases.

# type check error report

`checkSubtype` -- has `ctx.history` and return `Report`

- for error report in `assert-subtype`

# format

`formaType` -- handle `Arrow` well
