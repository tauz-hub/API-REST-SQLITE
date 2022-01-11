import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import hasPermission from "../middleware/hasPermission.js";
import { readdirSync } from 'fs';
import { dirname } from 'path';
import path from "path";
import { fileURLToPath } from 'url';
const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

const routeFolders = ['login', 'private', 'public'];

async function recursiveArchivesImport(folder, format) {
  const listDirectories = [];
  async function searchDirectories(search) {
    const folderPath = path.resolve(__dirname + '/' + `${search}`);

    const allFiles = readdirSync(folderPath, { withFileTypes: true });
    allFiles.forEach(async (file) => {

      if (file.isDirectory()) {
        searchDirectories(`${folderPath}/${file.name}`);
        return;
      }
      const { default: arquivo } = await import('./' + search + '/' + file.name)
      if (!file.name.endsWith(format)) return;

      if (arquivo.method) {
        if (arquivo.isAuthenticated) {
          if (arquivo.permissions?.length > 0) {

            await router[`${arquivo.method}`](arquivo.route, isAuthenticated, hasPermission, arquivo.run)
          } else {
            await router[`${arquivo.method}`](arquivo.route, isAuthenticated, arquivo.run)
          }
        } else {
          await router[`${arquivo.method}`](arquivo.route, arquivo.run)
        }
      }
    });
  }
  await searchDirectories(folder);

  return listDirectories;
}
routeFolders.forEach(async (folder) => await recursiveArchivesImport(folder, '.route.js'));

export default router;