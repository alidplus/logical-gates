export const generateId = () => Math.floor(999999 * Math.random()).toString(16) + '-' + Date.now().toString(16)

export const generateConstant = (): ISelectOption<boolean> => ({
  id: generateId(),
  label: '',
  value: true
})

export const generateArgument = (label: string = ''): IArgument => ({
  id: generateId(),
  label,
  value: generateConstant()
})

export const generateOperatable = (id: OperableTypes = 'empty'): IOperatableObject => {
  return {
    id,
    label: '',
    value: null
  }
}

export const isLogicalOperation = (id: OperableTypes): boolean => (['and', 'or', 'xor', 'not']).includes(id)

export const evaluateAnd = (list: boolean[]) => {
  return list.reduce((ret: boolean, bool: boolean) => ret && bool, true)
}

export const evaluateOr = (list: boolean[]) => {
  return list.reduce((ret: boolean, bool: boolean) => ret || bool, false)
}

export const evaluateXor = (list: boolean[]) => {
  // ref: https://www.howtocreate.co.uk/xor.html
  return list.reduce((ret: boolean, bool: boolean) => ret ? !bool : bool, false)
}

export const evaluateNot = (list: boolean[]) => {
  // ref: https://www.howtocreate.co.uk/xor.html
  return !list[0]
}

export const evaluateOperation = (operation: IOperatableObject): boolean | undefined => {
  if (typeof operation.value === 'boolean') return operation.value
  if (operation.value) {
    switch (operation.id) {
      case 'not':
        return evaluateNot(operation.value.map(evaluateOperation))
      case 'and':
        return evaluateAnd(operation.value.map(evaluateOperation))
      case 'or':
        return evaluateOr(operation.value.map(evaluateOperation))
      case 'xor':
        return evaluateXor(operation.value.map(evaluateOperation))
      default:
        if (typeof operation.value === 'object') return evaluateOperation(operation.value)
    }
  }
  return undefined
}

let hue = 0
export const printfOperation = (operation: IOperatableObject, lvl: number = 0): string => {
  let print = 'empty'
  let isLogicaln = false
  if (operation.value) {
    switch (operation.id) {
      case 'constant':
        print = operation.value.label;
        break;
      
      case 'getArg':
        print = `GET("${operation.value.label}")`;
        break;

      case 'not':
        print = `!${printfOperation(operation.value[0], lvl + 1)}`
        break;

      case 'and':
      case 'or':
      case 'xor':
        isLogicaln = true
        let splitter = ` ${operation.label} `
        print = operation.value.map((op: IOperatableObject) => printfOperation(op, lvl + 1)).join(splitter)
        break;
    }
  }
  hue = (hue + 200) % 256
  print = isLogicaln && lvl > 0 ? `( ${print} )` : print
  return `<span style="color: hsl(${hue}deg 100% 30%)" class="f-span">${print}</span>`
}

document.addEventListener('mouseenter', target => {
  
})