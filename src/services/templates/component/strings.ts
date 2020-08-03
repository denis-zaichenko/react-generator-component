import { createConstantName } from "../../utils";

export const createStringsFile = (folderName: string): ITemplate => {
  const constants = createConstantName(folderName);
  return {
    template: `
export const ${constants}_STRINGS = {};
    `.trim(),
    fileName: `${folderName}.strings.ts`,
  };
};
