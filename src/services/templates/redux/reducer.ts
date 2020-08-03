import { createName } from "../../utils";

export const createReduxReducer = (folderName: string): ITemplate => {
  const getName = createName(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
import { 
  INIT_REDUX_${constantsName}, 
  ${constantsName}_ACTION, 
  I${componentName}Redux, 
} from './${folderName}.constants';

import { T${componentName}Actions } from './${folderName}.actions';

const {
  CLEAR,
  UPDATE_FIELDS
} = ${constantsName}_ACTION;

export const reducer${componentName} = (
  state = INIT_REDUX_${constantsName},
  action: T${componentName}Actions
): I${componentName}Redux => {
  switch (action.type) {

    case CLEAR: {
      return INIT_REDUX_${constantsName};
    }

    case UPDATE_FIELDS: {
      return {...state, ...action.payload};
    }

    default:
      return state ?? INIT_REDUX_${constantsName};
  }
};
`.trim();

  return { template, fileName: `${folderName}.reducer.ts` };
};
