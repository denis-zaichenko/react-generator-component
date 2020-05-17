import { createComponentName } from "../../utils";

type TReactTemplateType = "default" | "state" | "styled" | "styleState";

const createReactTypeByTemplate = (
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

export interface I${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const { className }= props;

  return (
    <div className={className}></div>
  );
}`,
    styled: `
import React, { FC } from 'react';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const { className }= props;

  return (
    <${componentName}Styles.Wrapper className={className}></${componentName}Styles.Wrapper>
  );
}`,
    state: `
import React, { FC } from 'react';

import { use${componentName} } from './${folderName}.state';

export interface I${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const { className }= props;
  const {} = use${componentName}();

  return (
    <div className={className}></div>
  );
}`,
    styleState: `
import React, { FC } from 'react';

import { use${componentName} } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const { className }= props;
  const {} = use${componentName}();

  return (
    <${componentName}Styles.Wrapper className={className}></${componentName}Styles.Wrapper>
  );
}`,
  }[type].trim();

  return { template, fileName: `${folderName}.tsx` };
};
