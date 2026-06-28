#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PACKAGES_DIR = path.join(ROOT, "packages");
const RESOURCES_LOCAL_DIR = path.join(ROOT, "resources", "[local]");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function fail(message) {
  console.error(`[create-package] ERROR: ${message}`);
  process.exit(1);
}

function validateArgs(type, name) {
  if (!type || !name) {
    fail("Usage: node tools/create-package.js <lib|runtime> <package-name>");
  }

  if (!["lib", "runtime"].includes(type)) {
    fail(`Invalid type "${type}". Expected "lib" or "runtime".`);
  }

  if (!/^[a-z0-9-]+$/.test(name)) {
    fail(
      'Invalid package name. Use lowercase letters, numbers, and dashes only. Example: "core-events".'
    );
  }
}

function packageJsonLib(name) {
  return JSON.stringify(
    {
      name: `@fivem/${name}`,
      version: "1.0.0",
      private: true,
      main: "dist/index.js",
      types: "dist/index.d.ts",
      exports: {
        ".": {
          types: "./dist/index.d.ts",
          import: "./dist/index.js",
          require: "./dist/index.js",
          default: "./dist/index.js"
        }
      },
      typesVersions: {
        "*": {
          "*": ["dist/index.d.ts"]
        }
      },
      scripts: {
        build: "tsc -p tsconfig.json",
        watch: "tsc -p tsconfig.json --watch",
        clean: "if exist dist rmdir /s /q dist"
      }
    },
    null,
    2
  );
}

function packageJsonRuntime(name) {
  return JSON.stringify(
    {
      name: `@fivem/${name}`,
      version: "1.0.0",
      private: true,
      main: "dist/server/index.js",
      types: "dist/server/index.d.ts",
      exports: {
        "./server/public-api": {
          types: "./dist/server/public-api.d.ts",
          import: "./dist/server/public-api.js",
          require: "./dist/server/public-api.js",
          default: "./dist/server/public-api.js"
        },
        "./client/public-api": {
          types: "./dist/client/public-api.d.ts",
          import: "./dist/client/public-api.js",
          default: "./dist/client/public-api.js"
        }
      },
      typesVersions: {
        "*": {
          "server/public-api": ["dist/server/public-api.d.ts"],
          "client/public-api": ["dist/client/public-api.d.ts"]
        }
      },
      scripts: {
        "build:types": "tsc -p tsconfig.json --emitDeclarationOnly",
        "build:server":
          "esbuild src/server/index.ts --bundle --platform=node --target=node22 --format=cjs --outfile=dist/server/index.js",
        "build:server:api":
          "esbuild src/server/public-api.ts --bundle --platform=node --target=node22 --format=cjs --outfile=dist/server/public-api.js",
        "build:client":
          "esbuild src/client/index.ts --bundle --platform=browser --target=es2021 --format=iife --outfile=dist/client/index.js",
        "build:client:api":
          "esbuild src/client/public-api.ts --bundle --platform=browser --target=es2021 --format=esm --outfile=dist/client/public-api.js",
        "build:shared": 
          "esbuild src/shared/index.ts --bundle --platform=neutral --target=es2021 --format=esm --outfile=dist/shared/index.js",
        "build:shared:runtime": 
          "esbuild src/shared-runtime/index.ts --bundle --platform=neutral --target=es2021 --format=iife --outfile=dist/shared-runtime/index.js",
        "build": 
          "npm run clean && npm run build:types && npm run build:server && npm run build:server:api && npm run build:client && npm run build:client:api && npm run build:shared && npm run build:shared:runtime",
        clean: "if exist dist rmdir /s /q dist"
      },
      dependencies: {
        "@fivem/core-logger": "*",
        "@fivem/core-errors": "*"
      }
    },
    null,
    2
  );
}

function tsconfigJson() {
  return JSON.stringify(
    {
      extends: "../../tsconfig.base.json",
      compilerOptions: {
        rootDir: "src",
        outDir: "dist"
      },
      include: ["src/**/*.ts"]
    },
    null,
    2
  );
}

function fxmanifestLua(name) {
  return `fx_version 'cerulean'
game 'gta5'
node_version '22'

author 'Yava'
description '${name} module'
version '1.0.0'

dependency 'core-logger'

server_script 'dist/server/index.js'
client_script 'dist/client/index.js'
shared_script 'dist/shared-runtime/index.js'
`;
}

function serverTemplate(name) {
  return `import { createCoreLogger } from "@fivem/core-logger/server/public-api";

const logger = createCoreLogger("${name}");

logger.info("server starting");

on("onResourceStart", (resourceName: string) => {
  if (resourceName !== GetCurrentResourceName()) {
    return;
  }

  logger.info("resource boot confirmed");
});
`;
}

function serverPublicApiTemplate() {
  return `export {};
`;
}

function clientTemplate(name) {
  return `import { createClientLogger } from "@fivem/core-logger/client/public-api";

const logger = createClientLogger("${name}");

logger.info("client loaded");
`;
}

function clientPublicApiTemplate() {
  return `export {};
`;
}

function sharedTemplate() {
  return `export {};
`;
}

function sharedRuntimeTemplate() {
  return `export {};
`;
}

function createLibPackage(name) {
  const packageDir = path.join(PACKAGES_DIR, name);

  if (fs.existsSync(packageDir)) {
    fail(`Package "${name}" already exists in packages/.`);
  }

  writeFile(path.join(packageDir, "package.json"), packageJsonLib(name));
  writeFile(path.join(packageDir, "tsconfig.json"), tsconfigJson());
  writeFile(path.join(packageDir, "src", "index.ts"), `export {};\n`);

  console.log(`[create-package] Created lib package: packages/${name}`);
}

function createRuntimePackage(name) {
  const packageDir = path.join(PACKAGES_DIR, name);
  const resourceDir = path.join(RESOURCES_LOCAL_DIR, name);

  if (fs.existsSync(packageDir)) {
    fail(`Package "${name}" already exists in packages/.`);
  }

  writeFile(path.join(packageDir, "package.json"), packageJsonRuntime(name));
  writeFile(path.join(packageDir, "tsconfig.json"), tsconfigJson());
  writeFile(path.join(packageDir, "fxmanifest.lua"), fxmanifestLua(name));

  writeFile(path.join(packageDir, "src", "server", "index.ts"), serverTemplate(name));
  writeFile(path.join(packageDir, "src", "server", "public-api.ts"), serverPublicApiTemplate());
  writeFile(path.join(packageDir, "src", "client", "index.ts"), clientTemplate(name));
  writeFile(path.join(packageDir, "src", "client", "public-api.ts"), clientPublicApiTemplate());
  writeFile(path.join(packageDir, "src", "shared", "index.ts"), sharedTemplate());
  writeFile(path.join(packageDir, "src", "shared-runtime", "index.ts"), sharedRuntimeTemplate());

  ensureDir(path.join(packageDir, "src", "domain"));
  ensureDir(path.join(packageDir, "src", "application"));
  ensureDir(path.join(packageDir, "src", "infrastructure"));

  ensureDir(resourceDir);
  writeFile(path.join(resourceDir, ".gitkeep"), "");

  console.log(`[create-package] Created runtime package: packages/${name}`);
  console.log(`[create-package] Prepared resource target: resources/[local]/${name}`);
}

function main() {
  const [, , type, name] = process.argv;

  validateArgs(type, name);
  ensureDir(PACKAGES_DIR);
  ensureDir(RESOURCES_LOCAL_DIR);

  if (type === "lib") {
    createLibPackage(name);
    return;
  }

  createRuntimePackage(name);
}

main();