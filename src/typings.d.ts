type Label = string

interface IArgument {
  id: string,
  label: Label,
  value: ISelectOption<boolean>
}

type OperableTypes = 'empty' | 'constant' | 'getArg' | 'and' | 'or' | 'xor' | 'not'

type IOperatableObject = ISelectOption<any> & { id: OperableTypes, valueSize?: [number, number] }

interface IGenericInputProps<T> {
  value: T,
  label?: string,
  onChange: (value: T) => void,
}

interface ISelectOption<T> {
  id: string,
  label: string,
  disabled?: boolean,
  value: T
}

interface IGenericSelectProps<T> {
  value: T | undefined,
  label?: string,
  onChange: (value: T) => void,
  options: T[]
}

interface IGenericListProps<T> {
  list: Array<T>,
  onChange: (value: Array<T>) => void,
  itemFactory: () => T,
  component: any,
  label?: string,
  min?: number,
  max?: number
}

declare module "*.css" {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames
}
