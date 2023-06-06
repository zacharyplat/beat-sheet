import { Act } from "../../../../interfaces";
import styles from "../../page.module.css";
import Beat from "../beats/beat";
import NewBeat from "../beats/NewBeat";

import { useContext, useState } from "react";
import { ActsDispatchContext } from "../../store/ActsContext";
import Overlay from "../overlay/overlay";

type Props = {
  act: Act;
};

const Act = (props: Props) => {
  const dispatch = useContext(ActsDispatchContext);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { act } = props;
  const { name, id, beats } = act;

  const handleDeleteAct = () => {
    const makeApiCall = async () => {
      const res = await fetch(`/api/acts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res.ok && dispatch({ type: "actDeleted", id });
    };
    makeApiCall();
  };
  return (
    <div className={styles.act}>
      <div className={styles.actTabs}>
        <div className={styles.actTitle}>
          <div
            className={styles.actTitleIcon}
            onClick={() => handleDeleteAct()}
          ></div>
          <div>{name}</div>
        </div>
        <div
          className={styles.actAdd}
          onClick={() => setIsOverlayOpen(true)}
        ></div>
      </div>
      <AddActOverlay
        isOverlayOpen={isOverlayOpen}
        closeOverlay={() => setIsOverlayOpen(false)}
        id={id}
      ></AddActOverlay>

      <div className={styles.beats}>
        {beats.map &&
          beats.map((beat) => (
            <Beat key={beat.id} beat={beat} actId={id}></Beat>
          ))}
        <NewBeat actId={id} />
      </div>
    </div>
  );
};
export default Act;

type ActOverlayProps = {
  isOverlayOpen: boolean;
  closeOverlay: () => void;
  id: number;
};
const AddActOverlay = (props: ActOverlayProps) => {
  const dispatch = useContext(ActsDispatchContext);
  const { isOverlayOpen, closeOverlay, id } = props;
  const [newAct, setNewAct] = useState("");

  const handleSave = () => {
    const makeApiCall = async () => {
      const res = await fetch(`/api/acts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAct),
      });
      const act = await res.json();
      dispatch({ type: "actAdded", id: id, act: act });
    };
    closeOverlay();
    makeApiCall();
  };
  return (
    <Overlay isOpen={isOverlayOpen} onCancel={closeOverlay}>
      <form className={styles.overlay__form}>
        {["Act Name"].map((input) => (
          <label key={input} className={styles.custom_field}>
            <input
              type="text"
              name="input"
              onChange={(e) => setNewAct(e.target.value)}
            />
            <span className={styles.placeholder}>{input}</span>
          </label>
        ))}
        <div className={styles.overlay_button_container}>
          <button
            className={styles.overlay_button}
            type="submit"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className={styles.overlay_button}
            type="button"
            value="Cancel"
            onClick={() => closeOverlay()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Overlay>
  );
};
