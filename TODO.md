`normalize/unionlize` -- handle union under inter
`normalize/unionlize` -- handle `Tau`
`normalize/unionlize` -- handle union edge case

`normalize/interlize`
`interlize` stmt -- for testing

# recursive type

`define-type`

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
