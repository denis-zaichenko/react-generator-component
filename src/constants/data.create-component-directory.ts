export const COMMAND = [
  "Only component",
  "With state",
  "With style",
  "With state and style",
];

export const REACT_FILE_TEMPLATE = ["Component", "State", "Style"];
export const REACT_TYPE = ["Template", "Template with props", "Component"];
export const REDUX_TYPE = ["React", "React Native"];

export const STATE: IReactTemplate = { isWithState: true };
export const STYLE: IReactTemplate = { isWithStyle: true };
export const STATE_STYLE: IReactTemplate = {
  isWithState: true,
  isWithStyle: true,
};
