import { createComponentName } from "../../utils";

const createReact = (componentName: string) =>
  `
import React, { FC } from 'react';

export interface I${componentName}Props {
  className?: string;
}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const { className }= props;

  return (
    <div className={className}></div>
  );
}
`.trim();

const createReactStyled = (folderName: string, componentName: string) =>
  `
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
}
`.trim();

const createReactStyledState = (folderName: string, componentName: string) =>
  `
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
}
`.trim();

const createReactState = (folderName: string, componentName: string) =>
  `
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
}
`.trim();

export const createReactTemplate = (
  folderName: string,
  reactTemplate?: IReactTemplate
): ITemplate => {
  const componentName = createComponentName(folderName);
  const fileName = `${folderName}.tsx`;
  if (!reactTemplate) {
    return { template: createReact(componentName), fileName };
  }

  const { isWithState, isWithStyle } = reactTemplate;
  const template =
    (isWithState &&
      isWithStyle &&
      createReactStyledState(folderName, componentName)) ||
    (isWithState && createReactState(folderName, componentName)) ||
    (isWithStyle && createReactStyled(folderName, componentName)) ||
    createReact(componentName);

  return { template, fileName };
};
