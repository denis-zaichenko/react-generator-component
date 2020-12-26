import { importGlobalTypes, importTheme } from '../../utils';

interface Universal {
  name: string;
  isNative: boolean | undefined;
  folderName: string;
}

interface Styled extends Universal {
  isStyled: boolean;
}

interface Component {
  isStyled: boolean;
  isState: boolean;
}

const getWrapper = (isStyled: boolean, name: string) =>
  isStyled
    ? `<${name}Styles.Wrapper></${name}Styles.Wrapper>`
    : "<Theme.PageWrapper></Theme.PageWrapper>";

const importStyled = ({ folderName, isNative, name, isStyled }: Styled) =>
  isStyled
    ? `import { ${name}Styles } from './${folderName}.styles';`
    : importTheme(isNative);

const removeIdenticalLines = (str: string) => {
  const lines = str
    .trim()
    .split("\n")
    .map((line) => line.trim());

  const withoutIdenticalLine = lines.filter(
    (_, index) => lines[index] !== lines[index + 1]
  );

  return withoutIdenticalLine.join("\n");
};

export const createComponent = (starter: Universal) => (
  parameters: Component
) => {
  const { folderName, isNative, name } = starter;
  const { isState, isStyled } = parameters;

  const template = `
import React from 'react';

${isState ? `import { use${name}State } from './${folderName}.state';` : ""}

${importGlobalTypes(isNative)}

${importStyled({ folderName, isNative, isStyled, name })}

export const ${name}: TComponent = () => {
  ${isState ? `const {} = use${name}State();` : ""}

  return (
    ${getWrapper(isStyled, name)}
  );
}
`;

  return removeIdenticalLines(template);
};
