import { createConstantName } from '../../utils';

export const createStringsFile = (folderName: string): ITemplate => {
  const constants = createConstantName(folderName);
  return {
    template: `
export const ${constants}_STRINGS = {};
    `.trim(),
    fileName: `${folderName}.strings.ts`,
  };
};

export const createTypesFile = (folderName: string): ITemplate => ({
  template: ``,
  fileName: `${folderName}.types.ts`,
});

export const createConstantsFile = (folderName: string): ITemplate => ({
  template: ``,
  fileName: `${folderName}.constants.ts`,
});
