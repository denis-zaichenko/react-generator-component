import { createComponentName } from "../../utils";

export const createReactState = (folderName: string): ITemplate => {
  const componentName = createComponentName(folderName);
  return {
    template: `
import { useUpdateState } from 'services/hooks';

interface I${componentName}StateDate {}

const INITIAL_STATE: I${componentName}StateDate = {};

export const use${componentName} = () => {
  const { state, updateState } = useUpdateState(INITIAL_STATE);

  return { ...state };
};`.trim(),
    fileName: `${folderName}.state.ts`,
  };
};
