---
title: lattice of types
date: 2025-07-10
---

用格展示（lattice presentation），
来处理 x-lisp 中的类型。

设所有类型的集合为 `type-t`。

首先考虑 presentation 中的 generators。

非结构化的类型有：

- 基础类型为 `int-t float-t string-t`。
- 复合类型为 `data-t function-t`。
- 空类型为 `void-t`。

结构化的类型构造子：

- `tau tua*` 构造 `data-t` 的子集。
- `->` 构造 `function-t` 的子集。

格中个的类型算子：

- `union` -- lattice join
- `inter` -- lattice meet

格中的子类型关系用 `less` 和 `more` 来表示：

- `(forall ((A type-t) (B type-t)) (less (-> A B) function-t))`

然后考虑 presentation 中的 relations。

TODO
