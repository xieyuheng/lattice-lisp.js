(unionlize (union int-t (union float-t string-t)))
(unionlize (union (union float-t string-t) int-t))
(unionlize (tau :x (union (union float-t string-t) int-t)))
