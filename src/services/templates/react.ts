const createReact = (componentName: string) =>
  `
import React, { ReactNode } from 'react';

export interface I${componentName}Props {
  className?: string;
  children?: ReactNode;
}

export const ${componentName} = (props: I${componentName}Props) => {
  const { className, children } = props;

  return (
    <div className={className}>
      {children}
    </div>
  );
}
`.trim();

const createReactStyled = (folderName: string, componentName: string) =>
  `
import React, { ReactNode } from 'react';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {
  className?: string;
  children?: ReactNode;
}

export const ${componentName} = (props: I${componentName}Props) => {
  const { className, children } = props;

  return (
    <${componentName}Styles.Wrapper className={className}>
      {children}
    </${componentName}Styles.Wrapper>
  );
}
`.trim();

const createReactStyledState = (folderName: string, componentName: string) =>
  `
import React, { ReactNode } from 'react';

import { use${componentName} } from './${folderName}.state';

import { ${componentName}Styles } from './${folderName}.styles';

export interface I${componentName}Props {
  className?: string;
  children?: ReactNode;
}

export const ${componentName} = (props: I${componentName}Props) => {
  const { className, children } = props;
  const {} = use${componentName}();

  return (
    <${componentName}Styles.Wrapper className={className}>
      {children}
    </${componentName}Styles.Wrapper>
  );
}
`.trim();

const createReactState = (folderName: string, componentName: string) =>
  `
import React, { ReactNode } from 'react';

import { use${componentName} } from './${folderName}.state';

export interface I${componentName}Props {
  className?: string;
  children?: ReactNode;
}

export const ${componentName} = (props: I${componentName}Props) => {
  const { className, children } = props;
  const {} = use${componentName}();

  return (
    <div className={className}>
      {children}
    </div>
  );
}
`.trim();

export const createReactTemplate = (
  folderName: string,
  componentName: string,
  template?: ITemplate
) => {
  if (!template) {
    return createReact(componentName);
  }

  const { isWithState, isWithStyle } = template;
  return (
    (isWithState &&
      isWithStyle &&
      createReactStyledState(folderName, componentName)) ||
    (isWithState && createReactState(folderName, componentName)) ||
    (isWithStyle && createReactStyled(folderName, componentName)) ||
    createReact(componentName)
  );
};

export const createIndexTemplate = (folderName: string) =>
  `export * from './${folderName}';`;
