---
title: normalization
date: 2025-07-29
---

我们先有了简单的结构化的 subtype 算法，
对于 `subtype(targetType, superType)`，
所谓「结构化」就是：
- 把在 `targetType` 中出现的 union 转化为 conjunction；
- 把在 `targetType` 中出现的 inter 转化为 disjunction；
- 把在 `superType` 中出现的 union 转化为 disjunction；
- 把在 `superType` 中出现的 inter 转化为 conjunction。

```typescript
if (targetType.kind === "Union") {
  return targetType.candidateTypes.every((candidateType) =>
    subtypeInCtx(ctx, candidateType, superType),
  )
}

if (superType.kind === "Union") {
  return superType.candidateTypes.some((candidateType) =>
    subtypeInCtx(ctx, targetType, candidateType),
  )
}

if (targetType.kind === "Inter") {
  return targetType.aspectTypes.some((aspectType) =>
    subtypeInCtx(ctx, aspectType, superType),
  )
}

if (superType.kind === "Inter") {
  return superType.aspectTypes.every((aspectType) =>
    subtypeInCtx(ctx, targetType, aspectType),
  )
}
```

但是这种算法没法判断：

```scheme
(assert-subtype
  (tau :id (union int-t string-t) :x int-t)
  (union (tau :id int-t :x int-t) (tau :id string-t :x int-t)))
```

所以想到了先做 normalization 再判断。

unionlize 可以把 type 化为 `(union (inter))` 的矩阵，比如：

```scheme
(unionlize
 (tau :id (union int-t string-t)
      :x int-t
      :y int-t
      :z int-t))
=>
(union (inter (tau :id int-t) (tau :x int-t) (tau :y int-t) (tau :z int-t))
       (inter (tau :id string-t) (tau :x int-t) (tau :y int-t) (tau :z int-t)))
```

interlize 可以把 type 化为 `(inter (union))` 的矩阵，比如：

```scheme
(interlize
 (union (tau :x int-t :y int-t)
        (tau :x float-t :y float-t)))
=>
(inter (union (tau :x int-t) (tau :x float-t))
       (union (tau :x int-t) (tau :y float-t))
       (union (tau :y int-t) (tau :x float-t))
       (union (tau :y int-t) (tau :y float-t)))
```

但是我们没法先 normalization 再用结构化的 subtype 算法，比如：

```scheme
(assert-subtype
  (tau :x int-t :y int-t)
  (tau :x int-t :y anything-t))
```

经过 unionlize 或 interlize：

```scheme
(assert-subtype
  (inter (tau :x int-t) (tau :y int-t))
  (inter (tau :x int-t) (tau :y anything-t)))
```

所以说 subtype 的算法本身就有问题，
用 unionlize 和 interlize 找到了很多反例。

但是这不是问题所在，
主要的问题是 normalization
没法和 infinite tree + trail 的算法相容。

如果只是有限的 type，
用 unionlize 或者 interlize 获得 type 矩阵，
矩阵中的 type 已经完全不带 union 或者 inter 了，
因此可以很容易利用 type 上更基础的等词，
和集合论的概念来判断 subtype。

但是 infinite tree + trail 的算法，
应该是只和简单的就 tree 的结构的递归判断相容。
使用 normalization 获得矩阵再用集合论的概念来判断，
就没法用 infinite tree + trail 了。

难道说带有递归的 structural type 的项目失败了？

可能需要退一步：

- 退路 A：放弃 structural type。
- 退路 B：保持 structural type，
  但是不再使用自由的 union 和 inter：
  - 把 tau 作为特殊的 inter，
  - 把 variant 作为特殊的 union。

但是不论 A 还是 B，
这个项目都不能叫做 lattice-lisp 了，
因为 lattice 就来自 union 和 inter。
