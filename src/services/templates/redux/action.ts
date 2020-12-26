import { addNativeImport, createNameGroup } from '../../utils';

export const createReduxAction = (
  folderName: string,
  isNative?: boolean
): ITemplate => {
  const getName = createNameGroup(folderName);
  const constantsName = getName.constant();
  const componentName = getName.component();

  const template = `
import { action } from ${addNativeImport("services/utils", isNative)}

import { ${constantsName}_ACTION } from './${folderName}.constants';

const {} = ${constantsName}_ACTION;

export const ${componentName}Actions = {
};

//* Combine all action creator
type TActionCombiner<T> = T extends { [key: string]: infer U } ? U : never;
export type T${componentName}Actions = ReturnType<TActionCombiner<typeof ${componentName}Actions>>;
`.trim();

  return { template, fileName: `${folderName}.actions.ts` };
};
