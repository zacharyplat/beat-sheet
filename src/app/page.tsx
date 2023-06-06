import { Act, Beat } from "../../interfaces";
import ActsWrapper from "./components/acts/acts";
import styles from "./page.module.css";

async function getActs() {
  const res = await fetch("http://localhost:3000/api/acts", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

async function getBeatsByAct(acts: Act[]) {
  const beatSetPromises = acts.map(async (act) => {
    const res = await fetch(`http://localhost:3000/api/acts/${act.id}/beats`);
    return await res.json();
  });
  const beatSet = Promise.all(beatSetPromises);
  return beatSet;
}

export default async function Home() {
  const initialActs: Act[] = await getActs();
  const initalBeats: Beat[][] = await getBeatsByAct(initialActs);
  return (
    <main className={styles.main}>
      <h1>Beat Sheet</h1>
      <ActsWrapper initialActs={initialActs} initialBeats={initalBeats} />
    </main>
  );
}
