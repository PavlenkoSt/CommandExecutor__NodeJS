import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";
import { fileURLToPath } from "url";

export class FilesService {
  getFilePath(path: string, filename: string, extension: string) {
    if (!isAbsolute(path)) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      path = join(__dirname, path);
    }

    return join(dirname(path), `${filename}.${extension}`);
  }

  async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  async removeIfExist(path: string) {
    const isExist = await this.isExist(path);

    if (isExist) {
      await promises.unlink(path);
    }
  }
}
