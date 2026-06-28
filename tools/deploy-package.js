#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PACKAGES_DIR = path.join(ROOT, "packages");
const RESOURCES_DIR = path.join(ROOT, "resources", "[local]");

function fail(msg) {
  console.error(`[deploy] ERROR: ${msg}`);
  process.exit(1);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    fail(`Source not found: ${src}`);
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });

    for (const file of fs.readdirSync(src)) {
      copyRecursive(
        path.join(src, file),
        path.join(dest, file)
      );
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function deploy(name) {
  const packageDir = path.join(PACKAGES_DIR, name);
  const resourceDir = path.join(RESOURCES_DIR, name);

  if (!fs.existsSync(packageDir)) {
    fail(`Package not found: ${name}`);
  }

  const distDir = path.join(packageDir, "dist");
  const manifestPath = path.join(packageDir, "fxmanifest.lua");
  const migrationsDir = path.join(packageDir, "migrations");
  const seedsDir = path.join(packageDir, "seeds");

  if (!fs.existsSync(distDir)) {
    fail(`Missing dist folder. Run build first: ${name}`);
  }

  if (!fs.existsSync(manifestPath)) {
    fail(`Missing fxmanifest.lua: ${name}`);
  }

  cleanDir(resourceDir);
  fs.mkdirSync(resourceDir, { recursive: true });

  copyRecursive(distDir, path.join(resourceDir, "dist"));
  fs.copyFileSync(
    manifestPath,
    path.join(resourceDir, "fxmanifest.lua")
  );

  if (fs.existsSync(migrationsDir)) {
    copyRecursive(migrationsDir, path.join(resourceDir, "migrations"));
  }

  if (fs.existsSync(seedsDir)) {
    copyRecursive(seedsDir, path.join(resourceDir, "seeds"));
  }

  console.log(`[deploy] Deployed ${name} → resources/[local]/${name}`);
}

function main() {
  const [, , name] = process.argv;

  if (!name) {
    fail("Usage: node tools/deploy-package.js <package-name>");
  }

  deploy(name);
}

main();