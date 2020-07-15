import { createComponentName } from "../../utils";

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
  folderName: string,
  reactTemplate?: IReactTemplate
) => {
  const componentName = createComponentName(folderName);
  const type = createReactTypeByTemplate(reactTemplate);

  const template = {
    default: `
import React, { FC } from 'react';

import { Theme } from 'themes';

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

import { use${componentName} } from './${folderName}.state';

import { Theme } from 'themes';

export const ${componentName}: FC = () => {
  const {} = use${componentName}();

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styleState: `
import React, { FC } from 'react';

import { use${componentName} } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export const ${componentName}: FC = () => {
  const {} = use${componentName}();

  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
  }[type].trim();

  return { template, fileName: `${folderName}.tsx` };
};
