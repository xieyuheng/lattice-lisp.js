import type { Type } from "../type/index.ts"

export function formaType(type: Type): string {
  switch (type.kind) {
    case "TypeVar": {
      return type.name
    }

    case "AnythingType": {
      return "anything-t"
    }

    case "NothingType": {
      return "nothing-t"
    }

    case "BoolType": {
      return "bool-t"
    }

    case "StringType": {
      return "string-t"
    }

    case "Int": {
      return "int-t"
    }

    case "Float": {
      return "float-t"
    }

    case "Arrow": {
      const argType = formaType(type.argType)
      const retType = formaType(type.retType)
      return `(-> ${argType} ${retType})`
    }

    case "Union": {
      const candidateTypes = type.candidateTypes.map(formaType)
      return `(union ${candidateTypes.join(' ')})`
    }

    case "Inter": {
      const aspectTypes = type.aspectTypes.map(formaType)
      return `(inter ${aspectTypes.join(' ')})`
    }

    case "Tau": {
      const elementTypes = type.elementTypes.map(formaType)
      return `(tau ${elementTypes.join(' ')})`
    }
  }
}
