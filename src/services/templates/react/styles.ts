import { createComponentName } from "../../utils";

export const createReactStyle = (folderName: string): ITemplate => {
  const componentName = createComponentName(folderName);
  return {
    template: `
import styled from 'styled-components';

export const ${componentName}Styles = {
  Wrapper: styled.div\`\`,
};
`.trim(),
    fileName: `${componentName}.styles.ts`,
  };
};
