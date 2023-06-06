import { useMemo, useState } from "react";
import styles from "./assets/Styles.module.css";
import OperationBuilder from "./components/OperationBuilder";
import GenericList from "./components/GenericList";
import ArgumentInput from "./components/ArgumentInput";
import ArgumentsContext from "./contexts/ArgumentContext"
import { generateArgument, generateOperatable } from './utils'
import { evaluateOperation, printfOperation } from "./utils"

export default function App(): JSX.Element {
  const [list, setList] = useState<Array<IArgument>>([generateArgument('initial argument')]);
  const [operation, setOperation] = useState<IOperatableObject>(generateOperatable());
  const result = useMemo(() => evaluateOperation(operation), [operation])
  const report = useMemo(() => printfOperation(operation), [operation])
  return (
    <ArgumentsContext.Provider value={list}>
      <div>
        {/* todo: use <OperationBuilder> and have an interface

        for entering arguments and seeing the result */}
        <GenericList<IArgument> list={list} onChange={setList} itemFactory={generateArgument} component={ArgumentInput} label="arg"/>
        <hr />
        <OperationBuilder value={operation} onChange={setOperation} />
        <div className={styles.result}>Result: {String(result).toUpperCase()}</div>
        <div>Formula: <span dangerouslySetInnerHTML={{__html: report}} /></div>
        <pre>{JSON.stringify(operation, null, 2)}</pre>
      </div>
    </ArgumentsContext.Provider>
  );
}

