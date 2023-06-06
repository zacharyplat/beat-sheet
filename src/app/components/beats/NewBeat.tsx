import { useContext, useState } from "react";
import styles from "../../page.module.css";
import { ActsDispatchContext } from "../../store/ActsContext";
import Overlay from "../overlay/overlay";

type Props = { actId: number };

const Beat = ({ actId }: Props) => {
  const dispatch = useContext(ActsDispatchContext);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [newBeat, setNewBeat] = useState({
    name: "",
    time: "",
    content: "",
    cameraAngle: "",
    notes: "",
  });

  const handleSave = () => {
    const makeApiCall = async () => {
      const res = await fetch(`/api/acts/${actId}/beats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBeat),
      });
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to save beat");
      }
      const beat = await res.json();
      dispatch({ type: "beatAddedToAct", act: { id: actId }, beat: beat });
    };
    setIsOverlayOpen(false);
    makeApiCall();
  };
  const handleInputChange = (inputName: string, value: string) => {
    setNewBeat({ ...newBeat, [inputName]: value });
  };

  return (
    <>
      <Overlay isOpen={isOverlayOpen} onCancel={() => setIsOverlayOpen(false)}>
        <form className={styles.overlay__form}>
          {["name", "time", "content", "cameraAngle", "notes"].map((input) => (
            <label key={input} className={styles.custom_field}>
              <input
                type="text"
                name="input"
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
              <span className={styles.placeholder}>
                {input === "name" ? "Beat name" : input}
              </span>
            </label>
          ))}
          <div className={styles.overlay_button_container}>
            <button
              className={styles.overlay_button}
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className={styles.overlay_button}
              type="button"
              value="Cancel"
              onClick={() => setIsOverlayOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Overlay>
      <div
        className={styles.newBeat}
        onClick={() => setIsOverlayOpen(true)}
      ></div>
    </>
  );
};
export default Beat;
