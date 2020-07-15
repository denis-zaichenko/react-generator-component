import { createComponentName } from "../../utils";
import { createReactTypeByTemplate } from "./react";

export const createReactWithPropsTemplate = (
  folderName: string,
  reactTemplate?: IReactTemplate
) => {
  const componentName = createComponentName(folderName);
  const type = createReactTypeByTemplate(reactTemplate);

  const template = {
    default: `
import React, { FC } from 'react';

import { Theme } from 'themes';

export interface I${componentName}Props {

}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styled: `
import React, { FC } from 'react';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {

}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
    state: `
import React, { FC } from 'react';

import { use${componentName} } from './${folderName}.state';

import { Theme } from 'themes';

export interface I${componentName}Props {

}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  const {} = use${componentName}();

  return (
    <Theme.Wrapper></Theme.Wrapper>
  );
}`,
    styleState: `
import React, { FC } from 'react';

import { use${componentName} } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {

}

export const ${componentName}: FC<I${componentName}Props> = (props) => {
  const {} = props;
  const {} = use${componentName}();

  return (
    <${componentName}Styles.Wrapper></${componentName}Styles.Wrapper>
  );
}`,
  }[type].trim();

  return { template, fileName: `${folderName}.tsx` };
};
