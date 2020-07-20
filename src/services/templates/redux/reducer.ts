import { createConstantName, createComponentName } from "../../utils";

export const createReduxReducer = (folderName: string): ITemplate => {
  const constName = createConstantName(folderName);
  const componentName = createComponentName(folderName);
  const constantsName = createConstantName(folderName);

  const template = `
import { 
  INIT_REDUX_${constName}, 
  I${componentName}Redux, 
  ${constantsName}_ACTION 
} from './${folderName}.constants';

import { T${componentName}Actions } from './${folderName}.actions';

const {} = ${constantsName}_ACTION;

export const reducer${componentName} = (
  state = INIT_REDUX_${constName},
  action: T${componentName}Actions
): I${componentName}Redux => {
  switch (action.type) {

    default:
      return state ?? INIT_REDUX_${constName};
  }
};
`.trim();

  return { template, fileName: `${folderName}.reducer.ts` };
};