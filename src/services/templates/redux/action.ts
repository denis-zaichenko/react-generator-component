import { createConstantName, createComponentName } from "../../utils";

export const createReduxAction = (folderName: string): ITemplate => {
  const constantsName = createConstantName(folderName);
  const componentName = createComponentName(folderName);

  const template = `
import { ${constantsName}_ACTION } from './${folderName}.constants';

const {} = ${constantsName}_ACTION;

export const ${componentName}Actions = {};

//* Combine all action creator
type TActionCombiner<T> = T extends { [key: string]: infer U } ? U : never;
export type T${componentName}Actions = ReturnType<TCombiner<typeof ${componentName}Actions>>;
`.trim();

  return { template, fileName: `${folderName}.actions.ts` };
};
