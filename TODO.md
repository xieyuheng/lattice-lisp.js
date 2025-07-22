rename `runCommand` to `RunCommand`
`AssertSubtype` & `AssertNotSubtype` -- should only have two types
`handleEffect` -- `AssertSubtype` & `AssertNotSubtype`
`formaType`

setup test for examples -- TDD

`checkSubtype` -- `Tau`
`checkSubtype` -- `Union`
`checkSubtype` -- `Inter`

`checkSubtype` -- has `ctx.history` and return `Report`

- for error report in `assert-subtype`

`typeMatcher` -- `tau` -- support `attrTypes`
`typeMatcher` -- `tau*` -- support `restTypes`

`define-type`

`checkSubtype` -- take `ctx.trail`

`checkSubtype` -- support recursive type

`checkEquivalent` -- test equivalent relation -- by antisymmetry of subtyping
