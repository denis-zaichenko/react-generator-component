import { VSCode, createFolderName, generateFolderStructure } from "../utils";
import {
  createReduxIndex,
  createReduxConstants,
  createReduxAction,
  createReduxReducer,
} from "../templates/redux";

const commandCreateRedux = async (param: IFolderCommand) => {
  const { dir, name } = param;

  const generateFile = generateFolderStructure(dir, name);
  const folderName = createFolderName(name);

  await generateFile(createReduxIndex(folderName));
  await generateFile(createReduxAction(folderName));
  await generateFile(createReduxConstants(folderName));
  await generateFile(createReduxReducer(folderName));
};

export const createRedux = async (args: any) => {
  const name = await VSCode.createInput("Redux name");
  if (!name || !args) {
    return;
  }

  const dir = args.fsPath;
  commandCreateRedux({ dir, name });
};
