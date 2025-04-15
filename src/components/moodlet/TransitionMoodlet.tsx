import { ComponentProps, useEffect, useState } from "react"
import { Moodlet } from "./Moodlet"


interface PropsTransitionMoodlet {
  label: string,
  fontSize?: ComponentProps<typeof Moodlet>["fontSize"],
  leftIcon?: ComponentProps<typeof Moodlet>["leftIcon"],
  rightIcon?: ComponentProps<typeof Moodlet>["rightIcon"],
  initialState: string,
  states: Record<string, State>, 
}

type State = {
  leftClickKey?: string,
  rightClickKey?: string,
  onEnter?: () => void,
  border?: ComponentProps<typeof Moodlet>["color"],
  color?: ComponentProps<typeof Moodlet>["color"],
  fill?: ComponentProps<typeof Moodlet>["fill"],
  leftIcon?: ComponentProps<typeof Moodlet>["leftIcon"],
  rightIcon?: ComponentProps<typeof Moodlet>["rightIcon"],
}

type ClickEvent = React.MouseEvent<Element, MouseEvent>;

export function TransitionMoodlet(props: PropsTransitionMoodlet) {
  // const [currentKey, setCurrentKey] = useState(props.initialState);
  const [currentState, setCurrentState] = useState(props.states[props.initialState]);
  
  console.log('PropsTransitionMoodlet', props);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Safeguard, but warn also
    if (!currentState) {
      console.warn('Initial State did not match states', props);
      setCurrentState(
        Object.values(props.states)[0]
      );
      // setCurrentKey(Object.keys(props.states)[0]);
    }
  });

  function handleOnClick(event: ClickEvent) {
    // Stop Right-Clicks opening the right-click menu
    event.preventDefault();

    let newState: State | undefined = undefined;
    let newKey: string | undefined = undefined;

    // https://stackoverflow.com/questions/31110184/react-synthetic-event-distinguish-left-and-right-click-events
    if (event.nativeEvent.button === 0 && currentState.leftClickKey) {
      // Left Click
      newKey = currentState.leftClickKey;
      newState = props.states[newKey];
    } else if (event.nativeEvent.button === 2 && currentState.rightClickKey) {
      // Right Click
      newKey = currentState.rightClickKey;
      newState = props.states[newKey]; 
    }

    if (newState) {
      // Set the new State for Visual Updates
      setCurrentState(newState);
      // if (newKey) {
      //   // Keep TS happy
      //   setCurrentKey(newKey);
      // }

      // Tell the new State we have activated (if defined)
      newState.onEnter?.();
    }
  }

  if (!currentState) {
    return null;
  }
  return (
    <Moodlet
      onClick={handleOnClick}
      onContextMenu={handleOnClick}
      fontSize={props.fontSize}

      label={props.label}
      // label={currentKey}
      color={currentState.color}
      border={currentState.border}
      fill={currentState.fill}
      leftIcon={currentState.leftIcon ?? props.leftIcon}
      rightIcon={currentState.rightIcon ?? props.rightIcon}
    />
  )
}