import { Fragment } from "react";
import "./overlay.css";

type Props = {
  isOpen?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  children?: JSX.Element;
};

export function Overlay({ isOpen, onCancel, children }: Props) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onCancel} />
          <div className="overlay__container">
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onCancel}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;
