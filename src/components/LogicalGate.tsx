import "../typings.d";
import { useEffect } from "react";
import styles from "../assets/Styles.module.css";
import OperationBuilder from "./OperationBuilder";
import GenericList from "./GenericList";
import { generateOperatable } from '../utils'
import OperationSelect from "./OperationSelect";

type LogicalGateProps = IGenericInputProps<IOperatableObject[]> & {
  root: IOperatableObject,
  onSwitch?: (type: IOperatableObject) => void
}

function LogicalGate (props: LogicalGateProps): JSX.Element {
  const { onChange, value, onSwitch = () => null, root } = props;

  useEffect(() => {
    const length = root.valueSize ? root.valueSize[0] : 1
    const initialValue = (new Array(length).fill(generateOperatable()))
    if (!Array.isArray(value)) onChange(initialValue)
  }, [value])

  const handleSwitch = (operation: IOperatableObject) => {
    console.log('handleSwitch', operation);
    
    onSwitch({ ...operation, value })
  }

  const resetOperation = () => {
    onSwitch(generateOperatable('empty'))
  }

  return (
    <div className={styles.list} data-testid="logical-gate">
      <div className={styles.group}>
        <OperationSelect value={root} onChange={handleSwitch} label="??" logical />
        <button data-testid="remove-btn" className={styles.removeBtn} onClick={resetOperation}>&#8635;</button>
      </div>
      <div className={styles.indent} data-label={root.id}>
        {Array.isArray(value) ? (
          <GenericList<IOperatableObject>
            list={value}
            onChange={onChange}
            itemFactory={generateOperatable}
            min={root.valueSize ? root.valueSize[0] : undefined}
            max={root.valueSize ? root.valueSize[1] : undefined}
            component={OperationBuilder}
            label="operation"
          />
        ) : null}
      </div>
    </div>
  );
}

export default LogicalGate