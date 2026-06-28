import fs from "node:fs";
import path from "node:path";

export interface IResourceSqlFile {
  moduleName: string;
  version: string;
  fileName: string;
  absolutePath: string;
  sql: string;
}

function isSqlFile(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".sql");
}

function getAllResourceNames(): string[] {
  const resources: string[] = [];
  const resourceCount = GetNumResources();

  for (let index = 0; index < resourceCount; index += 1) {
    const resourceName = GetResourceByFindIndex(index);

    if (!resourceName) {
      continue;
    }

    resources.push(resourceName);
  }

  return resources.sort((a, b) => a.localeCompare(b));
}

export function loadResourceSqlFiles(directoryName: string): IResourceSqlFile[] {
  const files: IResourceSqlFile[] = [];
  const resourceNames = getAllResourceNames();

  for (const resourceName of resourceNames) {
    const resourcePath = GetResourcePath(resourceName);

    if (!resourcePath) {
      continue;
    }

    const targetDir = path.join(resourcePath, directoryName);

    if (!fs.existsSync(targetDir)) {
      continue;
    }

    const sqlFiles = fs
      .readdirSync(targetDir)
      .filter(isSqlFile)
      .sort((a, b) => a.localeCompare(b));

    for (const fileName of sqlFiles) {
      const absolutePath = path.join(targetDir, fileName);
      const sql = fs.readFileSync(absolutePath, "utf8");
      const version = fileName.replace(/\.sql$/i, "");

      files.push({
        moduleName: resourceName,
        version,
        fileName,
        absolutePath,
        sql
      });
    }
  }

  return files.sort((a, b) => {
    const moduleCompare = a.moduleName.localeCompare(b.moduleName);

    if (moduleCompare !== 0) {
      return moduleCompare;
    }

    return a.version.localeCompare(b.version);
  });
}