import "../typings.d";
import GenericSelect from "./GenericSelect";

type ConstantOption = ISelectOption<boolean>

type ConstantSelectProps = Omit<IGenericSelectProps<ConstantOption>, 'options'>

const options: ConstantOption[] = [
  { id: 'true', label: 'TRUE', value: true },
  { id: 'false', label: 'FALSE', value: false },
]

function ConstantSelect(props: ConstantSelectProps): JSX.Element {
  const { value, onChange, label } = props;
  return (
    <GenericSelect<ConstantOption> value={value} onChange={onChange} options={options} label={label} />
  );
}

export default ConstantSelect;
