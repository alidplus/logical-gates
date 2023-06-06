import "../typings.d";
import { useEffect, useMemo } from "react";
import styles from "../assets/Styles.module.css";

interface GenericSelectProps {
  id: string,
  label: string,
  disabled?: boolean
}

function GenericSelect<T extends GenericSelectProps>(props: IGenericSelectProps<T>): JSX.Element {
  const { value, onChange, options, label } = props;
  const handleChange = (index: number) => {
    onChange(options[index]);
  };
  
  const index = useMemo(() => {
    return options.findIndex(option => value && option.id === value.id)
  }, [options, value])

  useEffect(() => {
    if (index !== -1) onChange(options[index]);
    else if (options.length) onChange(options[0]);
  }, [options])
  
  return (
    <select
      data-testid="generic-select"
      title={`index: ${index}`}
      value={index}
      onChange={e => handleChange(+e.target.value)}
      className={styles.control}
    >
      {options.map((option, index) => (
        <option key={index} value={index} disabled={option.disabled}>{option.label}</option>
      ))}
    </select>
  );
}

export default GenericSelect;
