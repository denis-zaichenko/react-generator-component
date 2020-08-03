import { VSCode } from ".";

const getName = (path: string) => {
  const index = path.lastIndexOf("/");
  const name = path.slice(index + 1);

  return name;
};

export const getNameByPath = async (
  dir: string,
  type: string,
  notNeedPrintNameTypes: string[]
) => {
  let name: string | undefined;
  if (!notNeedPrintNameTypes.includes(type)) {
    name = getName(dir);
  } else {
    name = await VSCode.createInput("Component name");
  }

  if (name) {
    return name;
  }
};
