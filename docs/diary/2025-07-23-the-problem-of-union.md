---
title: the problem of union
date: 2025-07-23
---

目前在考虑 subtype 关系时，唯一遇到问题的就是 union type。

如果有 lattice 中的 normalization 算法，就可以判断子类型关系，
因为 lattice 中的 less (subtype) 判断，可以转化为等式的判断。

但是先 normalization 再判断相等，可能会指数爆炸。
并且 normalization 也没法直接作用于递归定义的类型，需要 delay。

union 遇到的难点：

```scheme
(subtype (union (tau :x A :y C)
                (tau :x B :y C))
         (tau :x (union A B) :y C))
```

可以转化为：

```scheme
(and (subtype (tau :x A :y C)
              (tau :x (union A B) :y C))
     (subtype (tau :x B :y C)
              (tau :x (union A B) :y C)))
```

但是反过来的判断：

```scheme
(subtype (tau :x (union A B) :y C)
         (union (tau :x A :y C)
                (tau :x B :y C)))
```

不能转化为：

```scheme
(or (subtype (tau :x (union A B) :y C)
             (tau :x A :y C))
    (subtype (tau :x (union A B) :y C)
             (tau :x B :y C)))
```

从 lattice theory 的角度讲，
类型所构成的 lattice 应该是非常特殊的，
union 作为 join 也是非常特殊的，
应该是可以判断 subtype 关系的。
还需要进一步研究。

[2026-02-13]

考虑集合论。

下面的等价成立：

```scheme
(subtype (union T1 T2) S) <=> (and (subtype T1 S) (subtype T2 S))
```

但是对于 super 位置出现的 union 只有一个方向成立：

```scheme
(subtype T (union S1 S2)) <= (or (subtype T S1) (subtype T S2))
```

对偶地，有：

```scheme
(subtype T (inter S1 S2)) <=> (and (subtype T S1) (subtype T S2))
```
