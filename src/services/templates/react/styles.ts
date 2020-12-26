import { createComponentName } from '../../utils';

export const createReactStyle = (
  folderName: string,
  isNative?: boolean
): ITemplate => {
  const componentName = createComponentName(folderName);
  return {
    template: `
import styled from 'styled-components${isNative ? "/native" : ""}';

export const ${componentName}Styles = {
  Wrapper: styled.${isNative ? "View" : "div"}\`\`,
};
`.trim(),
    fileName: `${folderName}.styles.ts`,
  };
};
