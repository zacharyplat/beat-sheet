import { useContext, useState } from "react";
import { Beat } from "../../../../interfaces";
import styles from "../../page.module.css";
import { ActsDispatchContext } from "../../store/ActsContext";
import Overlay from "../overlay/overlay";

type Props = {
  beat: Beat;
  actId: number;
};

const Beat = (props: Props) => {
  const { beat, actId } = props;
  const { id, name, time, content, cameraAngle, notes } = beat;

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div onClick={() => !isOverlayOpen && setIsOverlayOpen(true)}>
      <div>{name}</div>
      <div>{time}</div>
      <div>{content}</div>
      <div>{cameraAngle}</div>
      <div>{notes}</div>

      <EditBeatOverlay
        isOverlayOpen={isOverlayOpen}
        closeOverlay={() => setIsOverlayOpen(false)}
        id={id}
        actId={actId}
        beat={beat}
      ></EditBeatOverlay>
    </div>
  );
};
export default Beat;

type BeatOverlayProps = {
  isOverlayOpen: boolean;
  closeOverlay: () => void;
  id: number;
  actId: number;
  beat: Beat;
};
const EditBeatOverlay = (props: BeatOverlayProps) => {
  const dispatch = useContext(ActsDispatchContext);
  const { isOverlayOpen, closeOverlay, id, actId, beat } = props;
  const [editBeat, setEditBeat] = useState({
    name: beat.name || "",
    time: beat.time || "",
    content: beat.content || "",
    cameraAngle: beat.cameraAngle || "",
    notes: beat.notes || "",
  });

  const handleDelete = () => {
    const makeApiCall = async () => {
      await fetch(`/api/acts/${actId}/beats/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "beatDeleted", id });
    };
    makeApiCall();
  };

  const handleSave = () => {
    const makeApiCall = async () => {
      await fetch(`/api/acts/beats/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editBeat),
      });
      dispatch({
        type: "beatEdited",
        id: id,
        editedBeat: editBeat,
      });
    };
    closeOverlay();
    makeApiCall();
  };

  const handleInputChange = (inputName: string, value: string) => {
    setEditBeat({ ...editBeat, [inputName]: value });
  };
  return (
    <Overlay isOpen={isOverlayOpen} onCancel={() => closeOverlay()}>
      <form
        className={styles.overlay__form}
        onSubmit={(e) => e.preventDefault()}
      >
        {["name", "time", "content", "cameraAngle", "notes"].map((input) => (
          <label key={input} className={styles.custom_field}>
            <input
              type="text"
              name="input"
              onChange={(e) => handleInputChange(input, e.target.value)}
              value={editBeat[input]}
            />
            <span className={styles.placeholder}>{input}</span>
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
            onClick={closeOverlay}
          >
            Cancel
          </button>
          <button
            className={styles.overlay_button}
            type="button"
            value="Cancel"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </Overlay>
  );
};
