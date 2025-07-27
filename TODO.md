# union and inter

> fail faster -- try the simple but maybe wrong solution first!

`checkSubtype` -- `Union`
`checkSubtype` -- `Inter`

# type check error report

`checkSubtype` -- has `ctx.history` and return `Report`

- for error report in `assert-subtype`

# tau*

add `ListType` to `Type`

`typeMatcher` -- `tau*` -- support `restTypes`
`checkSubtype` -- `Tau` -- `restTypes`

# recursive type

`define-type`
`checkSubtype` -- take `ctx.trail`
`checkSubtype` -- support recursive type
`checkEquivalent` -- test equivalent relation -- by antisymmetry of subtyping

# format

`formaType` -- handle `Arrow` well
