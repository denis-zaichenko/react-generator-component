import { addNativeImport, createComponentName } from '../../utils';

export const createReactState = (
  folderName: string,
  isNative?: boolean
): ITemplate => {
  const componentName = createComponentName(folderName);
  return {
    template: `
import { useUpdateState } from ${addNativeImport("services/hooks", isNative)}

interface I${componentName}StateDate {}

const INITIAL_STATE: I${componentName}StateDate = {};

export const use${componentName}State = () => {
  const { state, updateState } = useUpdateState(INITIAL_STATE);

  return { ...state };
};`.trim(),
    fileName: `${folderName}.state.ts`,
  };
};
