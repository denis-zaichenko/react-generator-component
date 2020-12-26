import { createComponentName } from '../../utils';

import { createComponent } from './component';

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
  const name = createComponentName(folderName);
  const type = createReactTypeByTemplate(reactTemplate);

  const pattern = createComponent({ folderName, isNative, name });

  const template = {
    default: pattern({ isState: false, isStyled: false }),
    styled: pattern({ isState: false, isStyled: true }),
    state: pattern({ isState: true, isStyled: false }),
    styleState: pattern({ isState: true, isStyled: true }),
  }[type];

  return { template, fileName: `${folderName}.tsx` };
};
