import { createName } from "../../utils";

export const createReduxConstants = (folderName: string): ITemplate => {
  const getName = createName(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
export const ${constantsName}_ACTION = <const>{
  CLEAR: "@${constantsName}/CLEAR",
  UPDATE_FIELDS: "@${constantsName}/UPDATE_FIELDS",
};
  
export interface I${componentName}Redux {}
  
export const INIT_REDUX_${constantsName}: I${componentName}Redux = {};
`.trim();

  return {
    template,
    fileName: `${folderName}.constants.ts`,
  };
};
