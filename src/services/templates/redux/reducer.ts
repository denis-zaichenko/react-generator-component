import { createNameGroup } from '../../utils';

export const createReduxReducer = (folderName: string): ITemplate => {
  const getName = createNameGroup(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
import { 
  INIT_REDUX_${constantsName}, 
  ${constantsName}_ACTION, 
  I${componentName}Redux, 
} from './${folderName}.constants';

import { T${componentName}Actions } from './${folderName}.actions';

const {} = ${constantsName}_ACTION;

export const reducer${componentName} = (
  state = INIT_REDUX_${constantsName},
  action: T${componentName}Actions
): I${componentName}Redux => {
  switch (action.type) {

    default:
      return state ?? INIT_REDUX_${constantsName};
  }
};
`.trim();

  return { template, fileName: `${folderName}.reducer.ts` };
};
