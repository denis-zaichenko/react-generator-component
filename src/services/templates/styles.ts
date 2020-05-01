const STYLES = (componentName: string) =>
  `
import styled from 'styled-components';

export const ${componentName}Styles = {
  Wrapper: styled.div\`\`
};`.trim();

export const createStyle = (componentName: string) => STYLES(componentName);
