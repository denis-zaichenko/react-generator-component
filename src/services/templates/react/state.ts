import { createComponentName } from "../../utils";

export const createReactState = (folderName: string): ITemplate => {
  const componentName = createComponentName(folderName);
  return {
    template: `
import { useState } from 'react';

interface I${componentName}StateDate {}

interface I${componentName}State extends I${componentName}StateDate {}

const initState: I${componentName}StateDate = {};

export const use${componentName} = (): I${componentName}State => {
  const [state, setState] = useState<I${componentName}StateDate>(initState);

  return { ...state };
};`.trim(),
    fileName: `${folderName}.state.ts`,
  };
};
