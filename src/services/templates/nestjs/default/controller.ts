import { createName } from '../../../utils';

export const createNestJSController = (folderName: string): ITemplate => {
  const generateNames = createName(folderName);
  const constants = generateNames.constant();
  const component = generateNames.component();
  const folder = generateNames.folder();

  return {
    template: `
import { Controller, Get } from '@nestjs/common';

import { ${constants}_ROUTINGS } from './${folder}.constants';

const { MAIN } = ${constants}_ROUTINGS;

@Controller(MAIN)
export class ${component}Controller {

  @Get()
  get() {}
}
`.trim(),
    fileName: `${folderName}.controller.ts`,
  };
};
