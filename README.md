# ak_core – Framework FiveM en TypeScript

Framework pour FiveM (GTA V) développé en TypeScript avec une architecture modulaire.
Ce projet a pour objectif de fournir une base propre, extensible et typée pour créer des systèmes
serveur/client sur FiveM.

## 🚀 Fonctionnalités principales

- Architecture modulaire (managers, services, events)
- PlayerManager (gestion des joueurs, personnages, permissions)
- Système de commandes serveur en TypeScript
- Synchronisation client/serveur
- UI de jauges via SVG (vitesse, carburant, etc.)
- Build avec Webpack et typage strict TypeScript
- Persistance des données avec MariaDB

## 🛠️ Stack technique

- TypeScript
- Node.js
- FiveM (CitizenFX)
- Webpack
- MariaDB

## 📁 Structure du projet (exemple)

```txt
ak_core/
  src/
    core/
    managers/
    services/
    commands/
    client/
    server/
  dist/
  fxmanifest.lua
  package.json
  tsconfig.json
