import "../typings.d";
import { useMemo } from "react";
import GenericSelect from "./GenericSelect";
import { isLogicalOperation } from "../utils";

type OperationSelectProps = Omit<IGenericSelectProps<IOperatableObject>, 'options'> & { logical?: boolean }

const operatableOptions: IOperatableObject[] = [
  { id: 'empty', label: 'Select', value: null, disabled: true, valueSize: [0, 0] },
  { id: 'constant', label: 'Constant', value: null, valueSize: [0, 0] },
  { id: 'getArg', label: 'Get Argument', value: null, valueSize: [0, 0] },
  { id: 'and', label: 'AND', value: null, valueSize: [2, 99] },
  { id: 'or', label: 'OR', value: null, valueSize: [2, 99] },
  { id: 'xor', label: 'XOR', value: null, valueSize: [2, 99] },
  { id: 'not', label: 'NOT', value: null, valueSize: [1, 1] }
]

function OperationSelect(props: OperationSelectProps): JSX.Element {
  const { value, onChange, label, logical } = props;
  const onChange2 = (val: any) => {
    onChange(val)
  }
  const options = useMemo(() => {
    if (logical) return operatableOptions.filter(({ id }) => isLogicalOperation(id))
    return operatableOptions
  }, [logical])
  return (
    <GenericSelect<IOperatableObject> value={value} onChange={onChange2} options={options} label={label} />
  );
}

export default OperationSelect;
