import path, { dirname } from 'path';
import { Router } from 'express';
import { readdirSync } from 'fs';

import { fileURLToPath } from 'url';
import rateLimit from '../Middleware/rateLimit.js';
import permissionMiddleware from '../Middleware/permissionMiddleware.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const routeFolders = ['login', 'private', 'public'];

async function recursiveArchivesImport(folder, format) {
  async function searchDirectories(search) {
    const folderPath = path.resolve(`${__dirname}/${search}`);

    const allFiles = readdirSync(folderPath, { withFileTypes: true });
    allFiles.forEach(async (file) => {
      if (file.isDirectory()) {
        searchDirectories(`${folderPath}/${file.name}`);
        return;
      }
      const { default: archive } = await import(`./${search}/${file.name}`);
      if (!file.name.endsWith(format)) return;

      try {
        if (archive.method && archive.route) {
          if (archive.authMiddleware) {
            if (archive.permissions?.length > 0) {
              return await router[archive.method](
                archive.route,
                authMiddleware,
                (req, res, next) => {
                  permissionMiddleware(req, res, next, archive.permissions);
                },
                rateLimit,
                archive.run
              );
            }
            return await router[archive.method](
              archive.route,
              authMiddleware,
              rateLimit,
              archive.run
            );
          }
          return await router[archive.method](archive.route, rateLimit, archive.run);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
  await searchDirectories(folder);
}
routeFolders.forEach(async (folder) => recursiveArchivesImport(folder, '.route.js'));

export default router;
