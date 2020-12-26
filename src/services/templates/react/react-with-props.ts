import { createComponentName, importTheme } from '../../utils';

import { createReactTypeByTemplate } from './react';

export const createReactWithPropsTemplate = (
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

export interface I${componentName}Props {}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styled: `
import React, { FC } from 'react';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
    state: `
import React, { FC } from 'react';

import { use${componentName}State } from './${folderName}.state';

${importTheme(isNative)}

export interface I${componentName}Props {}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  const {} = use${componentName}State();

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styleState: `
import React, { FC } from 'react';

import { use${componentName}State } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  const {} = use${componentName}State();

  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
  }[type].trim();

  return { template, fileName: `${folderName}.tsx` };
};
