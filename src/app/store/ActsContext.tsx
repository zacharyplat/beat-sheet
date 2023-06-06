import { createContext, Dispatch, useReducer } from "react";
import { Act, Beat } from "../../../interfaces";

export const ActsContext = createContext([] as any[]);
export const ActsDispatchContext = createContext(
  (() => undefined) as Dispatch<any>
);

type Props = {
  initialActs: Act[];
  initialBeats: Beat[][];
  children: JSX.Element;
};

export function ActProvider({ children, initialActs, initialBeats }: Props) {
  const initialStore = initialActs?.map((act, index) => ({
    ...act,
    beats: [...initialBeats?.[index]],
  }));
  const [acts, dispatch] = useReducer(actsReducer, initialStore);

  return (
    <ActsContext.Provider value={acts}>
      <ActsDispatchContext.Provider value={dispatch}>
        {children}
      </ActsDispatchContext.Provider>
    </ActsContext.Provider>
  );
}

function actsReducer(acts: Act[], action: any) {
  switch (action.type) {
    case "actAdded": {
      const newAct = { ...action.act, beats: [] };
      return acts.flatMap((act) => {
        return act.id === action.id ? [newAct, act] : act;
      });
    }
    case "beatAddedToAct": {
      return acts.map((act) => {
        return act.id === action.act?.id
          ? { ...act, beats: [...act.beats, action.beat] }
          : act;
      });
    }

    case "beatEdited": {
      const returnacts = acts.map((act) => {
        const beats = act.beats.map((beat) =>
          beat.id === action.id ? { id: action.id, ...action.editedBeat } : beat
        );
        return { ...act, beats };
      });
      console.log(returnacts);
      return returnacts;
    }
    case "actChanged": {
      return acts.map((act) => {
        return act.id === action.act?.id ? action.act : act;
      });
    }
    case "actDeleted": {
      return acts.filter((act) => act.id !== action.id);
    }
    case "beatDeleted": {
      return acts.map((act) => {
        const beats = act.beats.filter((beat) => beat.id !== action.id);
        return { ...act, beats };
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
