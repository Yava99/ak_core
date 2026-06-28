#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PACKAGES_DIR = path.join(ROOT, "packages");
const RESOURCES_DIR = path.join(ROOT, "resources", "[local]");

function log(message) {
  console.log(`[deploy-all] ${message}`);
}

function fail(message) {
  console.error(`[deploy-all] ERROR: ${message}`);
  process.exit(1);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source not found: ${src}`);
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    ensureDir(dest);

    for (const entry of fs.readdirSync(src)) {
      copyRecursive(
        path.join(src, entry),
        path.join(dest, entry)
      );
    }

    return;
  }

  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function isRuntimePackage(packageDir) {
  const manifestPath = path.join(packageDir, "fxmanifest.lua");
  const distPath = path.join(packageDir, "dist");

  return fs.existsSync(manifestPath) && fs.existsSync(distPath);
}

function deployPackage(packageName) {
  const packageDir = path.join(PACKAGES_DIR, packageName);
  const resourceDir = path.join(RESOURCES_DIR, packageName);

  const manifestPath = path.join(packageDir, "fxmanifest.lua");
  const distPath = path.join(packageDir, "dist");
  const migrationsPath = path.join(packageDir, "migrations");
  const seedsPath = path.join(packageDir, "seeds");

  cleanDir(resourceDir);
  ensureDir(resourceDir);

  copyRecursive(manifestPath, path.join(resourceDir, "fxmanifest.lua"));
  copyRecursive(distPath, path.join(resourceDir, "dist"));

  if (fs.existsSync(migrationsPath)) {
    copyRecursive(migrationsPath, path.join(resourceDir, "migrations"));
  }

  if (fs.existsSync(seedsPath)) {
    copyRecursive(seedsPath, path.join(resourceDir, "seeds"));
  }

  log(`Deployed ${packageName} -> resources/[local]/${packageName}`);
}

function main() {
  if (!fs.existsSync(PACKAGES_DIR)) {
    fail("packages/ directory not found.");
  }

  ensureDir(RESOURCES_DIR);

  const entries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const runtimePackages = entries.filter((packageName) =>
    isRuntimePackage(path.join(PACKAGES_DIR, packageName))
  );

  if (runtimePackages.length === 0) {
    log("No runtime packages with fxmanifest.lua + dist/ found.");
    return;
  }

  for (const packageName of runtimePackages) {
    deployPackage(packageName);
  }

  log(`Done. Deployed ${runtimePackages.length} runtime package(s).`);
}

main();