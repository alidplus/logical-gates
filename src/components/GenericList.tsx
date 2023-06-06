import "../typings.d";
import { useMemo } from "react";
import styles from "../assets/Styles.module.css";

function GenericList<T>(props: IGenericListProps<T>): JSX.Element {
  const { list, onChange, itemFactory, component: Component, label = '', min = 2, max = Infinity } = props;
  const clone: Array<T> = useMemo(() => {
    return Array.from(list)
  }, [list])
  const handleArgAdd = () => {
    clone.push(itemFactory())
    onChange(clone);
  };
  const handleArgChange = (index: number, arg: T) => {
    clone.splice(index, 1, arg)
    onChange(clone);
  };
  const handleArgRemove = (index: number) => {
    clone.splice(index, 1)
    onChange(clone);
  }
  const disableListControls = min === max
  return (
    <div className={styles.list}>
      {list.map((arg, index) => (
        <div key={index} className={styles.group}>
          {disableListControls ? null : (
            <button
              data-testid="remove-btn"
              className={styles.removeBtn}
              onClick={handleArgRemove.bind(null, index)}
              disabled={list.length <= min}
            >
              X
            </button>
          )}
          <Component
            key={index}
            value={arg}
            onChange={handleArgChange.bind(null, index)}
          />
        </div>
      ))}
      {disableListControls ? null : (
        <button
          data-testid="add-btn"
          className={styles.addBtn}
          onClick={handleArgAdd}
          disabled={list.length >= max}
        >
          + add {label}
        </button>
      )}
    </div>
  );
}

export default GenericList;
