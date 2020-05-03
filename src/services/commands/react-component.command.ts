import { VSCode, createFolderName, generateFolderStructure } from "../utils";
import {
  createReactTemplate,
  createReactState,
  createReactStyle,
  createReactIndex,
} from "../templates/react";

interface ICreateFolderParam extends IFolderCommand {
  template?: IReactTemplate;
}

const commandCreateComponent = async (params: ICreateFolderParam) => {
  const { name, dir, template } = params;

  const folderName = createFolderName(name);
  const generateFile = generateFolderStructure(dir, name);

  VSCode.showBox(dir);

  await generateFile(createReactIndex(folderName));
  await generateFile(createReactTemplate(folderName, template));

  if (!template) {
    return;
  }

  const { isWithState, isWithStyle } = template;
  if (isWithState) {
    await generateFile(createReactState(folderName));
  }
  if (isWithStyle) {
    await generateFile(createReactStyle(folderName));
  }
};

export const createReactComponent = (args: any) => async (
  template?: IReactTemplate
) => {
  const name = await VSCode.createInput("Component name");
  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  commandCreateComponent({ dir, name, template });
};
