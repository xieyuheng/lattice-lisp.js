support `assert-type-equal` stmt
`assert-type-equal` -- test

# tau*

add `ListType` to `Type`

`typeMatcher` -- `tau*` -- support `restTypes`
`checkSubtype` -- `Tau` -- `restTypes`

# literal type

[problem] how to include data in type?

- as exp?
- as value?
- or a special format only for type?

test ADT by literal string type

# type check error report

`checkSubtype` -- has `ctx.history` and return `Report`

- for error report in `assert-subtype`

# recursive type

`define-type`

`checkSubtype` -- take `ctx.trail`
`checkSubtype` -- support recursive type

# union and inter

fix edge cases.

# format

`formaType` -- handle `Arrow` well
