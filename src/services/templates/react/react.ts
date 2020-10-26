import { createComponentName, importTheme } from '../../utils';

export type TReactTemplateType = "default" | "state" | "styled" | "styleState";

export const createReactTypeByTemplate = (
  template?: IReactTemplate
): TReactTemplateType => {
  if (!template) {
    return "default";
  }
  const { isWithState, isWithStyle } = template;
  return (
    (isWithState && isWithStyle && "styleState") ||
    (isWithState && "state") ||
    (isWithStyle && "styled") ||
    "default"
  );
};

export const createReactTemplate = (
  optional: {
    reactTemplate?: IReactTemplate;
    isNative?: boolean;
  } = {}
) => (folderName: string) => {
  const { isNative, reactTemplate } = optional;
  const componentName = createComponentName(folderName);
  const type = createReactTypeByTemplate(reactTemplate);

  const template = {
    default: `
import React, { FC } from 'react';

${importTheme(isNative)}

export const ${componentName}: FC = () => {
  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styled: `
import React, { FC } from 'react';

import { ${componentName}Styles } from './${folderName}.styles';

export const ${componentName}: FC = () => {
  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
    state: `
import React, { FC } from 'react';

import { use${componentName}State } from './${folderName}.state';

${importTheme(isNative)}

export const ${componentName}: FC = () => {
  const {} = use${componentName}State();

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styleState: `
import React, { FC } from 'react';

import { use${componentName}State } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export const ${componentName}: FC = () => {
  const {} = use${componentName}State();

  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
  }[type].trim();

  return { template, fileName: `${folderName}.tsx` };
};
