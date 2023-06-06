"use client";
import { useContext } from "react";
import type { Act as IAct, Beat as IBeat } from "../../../../interfaces";
import styles from "../../page.module.css";
import { ActProvider, ActsContext } from "../../store/ActsContext";
import Act from "./act";

type Props = {
  initialActs: IAct[];
  initialBeats: IBeat[][];
};
const ActsWrapper = ({ initialActs, initialBeats }: Props) => {
  return (
    <ActProvider initialActs={initialActs} initialBeats={initialBeats}>
      <Acts />
    </ActProvider>
  );
};
export default ActsWrapper;

const Acts = () => {
  const acts: Act[] = useContext(ActsContext);
  return (
    <div className={styles.acts}>
      {acts &&
        acts.map((act: IAct, index: number) => {
          return <Act key={act.id} act={act} />;
        })}
    </div>
  );
};
