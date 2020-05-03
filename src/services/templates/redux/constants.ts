import { createConstantName, createComponentName } from "../../utils";

export const createReduxConstants = (folderName: string): ITemplate => {
  const constantsName = createConstantName(folderName);
  const componentName = createComponentName(folderName);

  const template = `
export const ${constantsName}_ACTION = <const>{};
  
export interface I${componentName}Redux {}
  
export type I${componentName}ReduxKeys = keyof I${componentName}Redux;
  
export const INIT_REDUX_${constantsName}: I${componentName}Redux = {};
`.trim();

  return {
    template,
    fileName: `${folderName}.constants.ts`,
  };
};
