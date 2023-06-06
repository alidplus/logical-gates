import "../typings.d";
import ConstantSelect from "./ConstantSelect";
import styles from "../assets/Styles.module.css";

function ArgumentInput(props: IGenericInputProps<IArgument>): JSX.Element {
  const { value, onChange } = props;
  const handleLabelChange = (label: string) => {
    onChange({ ...value, label });
  };
  const handleValueChange = (v: ISelectOption<boolean>) => {
    onChange({ ...value, value: v });
  };
  return (
    <>
      <input
        type="text"
        data-testid="label-input"
        value={value.label}
        onChange={e => handleLabelChange(e.target.value)}
        placeholder="argument label"
        className={styles.control}
      />
      <ConstantSelect
        label="constant"
        data-testid="value-select"
        value={value.value}
        onChange={handleValueChange}
      />
    </>
  );
}

export default ArgumentInput;
