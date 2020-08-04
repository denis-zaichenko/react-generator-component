import { createName } from '../../../utils';

export const createNestJSModules = (folderName: string): ITemplate => {
  const generateNames = createName(folderName);
  const folder = generateNames.folder();
  const component = generateNames.component();

  return {
    template: `
import { Module } from '@nestjs/common';

import { ${component}Controller } from './${folder}.controller';
import { ${component}Service } from './${folder}.service';

@Module({
  controllers: [${component}Controller],
  providers: [${component}Service],
})
export class ${component}Module {}
`.trim(),
    fileName: `${folderName}.module.ts`,
  };
};
