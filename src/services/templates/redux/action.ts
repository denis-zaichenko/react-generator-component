import { createName } from "../../utils";

export const createReduxAction = (folderName: string): ITemplate => {
  const getName = createName(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
import { action } from 'services/utils';

import { ${constantsName}_ACTION } from './${folderName}.constants';

import { I${componentName}Redux } from './${folderName}.typings';

const {
  CLEAR,
  UPDATE_FIELDS
} = ${constantsName}_ACTION;

export const ${componentName}Actions = {
  clear = () => action(CLEAR),
  updateFields = (payload: Partial<I${componentName}Redux>) => 
    action(UPDATE_FIELDS, payload),
};

//* Combine all action creator
type TActionCombiner<T> = T extends { [key: string]: infer U } ? U : never;
export type T${componentName}Actions = ReturnType<TActionCombiner<typeof ${componentName}Actions>>;
`.trim();

  return { template, fileName: `${folderName}.actions.ts` };
};
