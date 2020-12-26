import { createNameGroup } from '../../utils';

export const createReduxConstants = (folderName: string): ITemplate => {
  const getName = createNameGroup(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
export const ${constantsName}_ACTION = <const>{};
  
export interface I${componentName}Redux {}
  
export const INIT_REDUX_${constantsName}: I${componentName}Redux = {};
`.trim();

  return {
    template,
    fileName: `${folderName}.constants.ts`,
  };
};
