import "../typings.d";
import { useContext } from "react";
import ArgumentsContext from "../contexts/ArgumentContext";
import GenericSelect from "./GenericSelect";

type ArgumentSelectProps = Omit<IGenericSelectProps<IArgument>, 'options'>

function ArgumentSelect(props: ArgumentSelectProps): JSX.Element {
  const { value, onChange, label } = props;
  const options = useContext(ArgumentsContext)
  return (
    <GenericSelect<IArgument> value={value} onChange={onChange} options={options} label={label} />
  );
}

export default ArgumentSelect;
