import { createConstantName, createComponentName } from "../../utils";

export const createReduxReducer = (folderName: string): ITemplate => {
  const constName = createConstantName(folderName);
  const componentName = createComponentName(folderName);
  const constantsName = createConstantName(folderName);

  const template = `
import { 
  INIT_REDUX_${constName}, 
  ${constantsName}_ACTION, 
  I${componentName}Redux, 
} from './${folderName}.constants';

import { T${componentName}Actions } from './${folderName}.actions';

const {
  CLEAR,
  UPDATE_FIELDS
} = ${constantsName}_ACTION;

export const reducer${componentName} = (
  state = INIT_REDUX_${constName},
  action: T${componentName}Actions
): I${componentName}Redux => {
  switch (action.type) {

    case CLEAR: {
      return INIT_REDUX_${constName};
    }

    case UPDATE_FIELDS: {
      return {...state, ...action.payload};
    }

    default:
      return state ?? INIT_REDUX_${constName};
  }
};
`.trim();

  return { template, fileName: `${folderName}.reducer.ts` };
};
