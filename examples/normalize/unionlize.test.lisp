(unionlize (union int-t (union float-t string-t)))
(unionlize (union (union float-t string-t) int-t))
(unionlize (tau :x (union (union float-t string-t) int-t)))

(unionlize (inter (union float-t string-t) int-t))
(unionlize
 (inter (union (tau :id int-t)
               (tau :id string-t))
        (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)))

(unionlize
 (inter (tau :x int-t)
        (tau :y int-t)
        (tau :z int-t)
        (union (tau :id int-t)
               (tau :id string-t))))

;; TODO union under tau

;; (unionlize
;;  (inter (tau :id (union int-t string-t))
;;         (tau :x int-t)
;;         (tau :y int-t)
;;         (tau :z int-t)))

;; (unionlize
;;  (inter (tau :x int-t)
;;         (tau :y int-t)
;;         (tau :z int-t)
;;         (tau :id (union int-t string-t))))
