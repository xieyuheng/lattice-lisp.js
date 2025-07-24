---
title: lattice of types
date: 2025-07-10
---

# lattice presentation

用格展示（lattice presentation），
来处理 lattice-lisp 中的类型。

设所有类型的集合为 `type-t`。

首先考虑 presentation 中的 generators。

非结构化的类型：

| 基础类型为 | `bool-t int-t float-t string-t` |
| 复合类型为 | `data-t function-t`             |
| 全类型为   | `anything-t`                    |
| 空类型为   | `nothing-t`                     |

结构化的类型构造子：

- `tau tua*` 构造 `data-t` 的子集。
- `->` 构造 `function-t` 的子集。

格中个的类型算子：

- `union` -- lattice join
- `inter` -- lattice meet

格中的子类型关系用 `subtype` 来表示：

```scheme
(subtype (-> A B) function-t)
```

然后考虑 presentation 中的 relations。

# 基本盘

bottom type 与 top type：

```scheme
---------------------
(subtype nothing-t A)
```

```scheme
----------------------
(subtype A anything-t)
```

tuple type：

```scheme
(subtype A C)
(subtype B D)
-----------------------------
(subtype (tau A B) (tau C D))
```

record type：

```scheme
(subtype A C)
(subtype B D)
-----------------------------------------
(subtype (tau :x A :y B) (tau :x C :y D))
```

关于子类型最重要的基本盘就是，
属性越多所代表的类型越小：

```scheme
(subtype A C)
------------------------------------
(subtype (tau :x A :y B) (tau :x C))
```

inter of two record types is record type：

```scheme
(== (inter (tau :x A) (tau :c B))
    (tau :x A :c B))
```

# 分配律

类比 `mul` distribute over `add`：

```scheme
(== (mul x (add y z))
    (add (mul x y) (mul x z)))
```

有 `inter` distribute over `union`：

```scheme
(== (inter A (union B C))
    (union (inter A B) (inter A C)))
```

用 `tau` 来验证：

```scheme
(== (inter (tau :x A) (union (tau :y B) (tau :y C)))
    (union (inter (tau :x A) (tau :y B))
           (inter (tau :x A) (tau :y C))))
```

因为 `tau` 对 record 而言等价于 `inter`，
所以也可以说是 record `tau` distribute over `union`：

```scheme
(== (tau :x A :y (union B C))
    (union (tau :x A :y B)
           (tau :x A :y C)))
```

反过来 的 `union` distribute over `inter` 呢？

```scheme
(== (union A (inter B C))
    (inter (union A B) (union A C)))
```

用 `tau` 来验证：

```scheme
(== (union A (inter (tau :x B) (tau :y C)))
    (inter (union A (tau :x B))
           (union A (tau :x C))))
```

或者：

```scheme
(== (union A (tau :x B :y C))
    (inter (union A (tau :x B))
           (union A (tau :y C))))
```

注意 `(union A (tau :x B))`
并不等于`(tau :x (union A B))`。

好像不能用 record `tau` 来研验证 `union` 相关的规则，
因为 `union` 和 record 并没有交互。

```scheme
(union (tau :x A1 :y B1 :z C1)
       (tau :x A2 :y B2 :z C2))
```

只有在所有 field 都相同，只有一个 field 不同的时候才有交互：

```scheme
(== (union (tau :x A1 :y B :z C)
           (tau :x A2 :y B :z C))
    (tau :x (union A1 A2) :y B :z C))
```
