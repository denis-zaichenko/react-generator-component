import { createComponentName } from '../../../utils';

export const createReactServices = (folderName: string): ITemplate => {
  const component = createComponentName(folderName);

  return {
    template: `
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${component}Service {}
`.trim(),
    fileName: `${folderName}.service.ts`,
  };
};
