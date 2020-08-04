import { createName } from '../../../utils';

export const createNestJSConstants = (folderName: string): ITemplate => {
  const generateNames = createName(folderName);
  const constants = generateNames.constant();
  const component = generateNames.component();

  return {
    template: `
const ${constants}_ROUTINGS = {
  MAIN: '${component}',
};
`.trim(),
    fileName: `${folderName}.constants.ts`,
  };
};
