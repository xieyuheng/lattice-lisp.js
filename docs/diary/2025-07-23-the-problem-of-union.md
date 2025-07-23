---
title: the problem of union
date: 2025-07-23
---

目前在考虑 subtype 关系时，唯一遇到问题的就是 union type。

如果有 lattice 中的 normalization 算法，就可以判断子类型关系，
因为 lattice 中的 less 判断，可以转化为等式的判断。

但是先 normalization 再判断相等，可能会指数爆炸。

并且 normalization 也没法直接作用于递归定义的类型，需要 delay。

实现子类型检查函数，主要的难点是 union，
可能需要让函数带有当前 union 的所有参数。

比如：

```scheme
(less (union (tau :x A :y C)
             (tau :x B :y C))
      (tau :x (union A B) :y C))
```

可以转化为：

```scheme
(and (less (tau :x A :y C)
           (tau :x (union A B) :y C))
     (less (tau :x B :y C)
           (tau :x (union A B) :y C)))
```

但是：

```scheme
(less (tau :x (union A B) :y C)
      (union (tau :x A :y C)
             (tau :x B :y C)))
```

不能转化为：

```scheme
(or (less (tau :x (union A B) :y C)
          (tau :x A :y C))
    (less (tau :x (union A B) :y C)
          (tau :x B :y C)))
```
