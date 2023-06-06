import "../typings.d";
import ConstantSelect from "../components/ConstantSelect"
import ArgumentSelect from './ArgumentSelect'
import LogicalGate from "./LogicalGate";
import styles from "../assets/Styles.module.css";
import { isLogicalOperation } from "../utils"
import OperationSelect from "./OperationSelect";

function OperationBuilder(props: IGenericInputProps<IOperatableObject>): JSX.Element {
  const { value, onChange } = props
  
  const handleOperationChange = (newValue: any) => {
    onChange(Object.assign({}, value, { value: newValue }))
  }
  
  const handleChangeType = (id: OperableTypes) => {
    onChange(Object.assign({}, value, { id }))
  }

  const isLogical = isLogicalOperation(value.id)
  
  return (
    <div className={styles.list}>
      <div className={styles.group}>
        {isLogical ? (
          <LogicalGate root={value} value={value.value} onChange={handleOperationChange} onSwitch={onChange} />
        ) : null}
        {value.id === 'constant' ? (
          <ConstantSelect value={value.value} onChange={handleOperationChange} label="!!" />
        ) : null}
        {value.id === 'getArg' ? (
          <ArgumentSelect value={value.value} onChange={handleOperationChange} label="$$"/>
        ) : null}
        {value.id === 'empty' ? (
          <OperationSelect value={value} onChange={onChange} label="??" />
        ) : null}
        {!isLogical && value.id ? (
          <button data-testid="remove-btn" className={styles.removeBtn} onClick={handleChangeType.bind(null, 'empty')}>&#8635;</button>
        ) : null}
      </div>
    </div>
  );
}

export default OperationBuilder;
