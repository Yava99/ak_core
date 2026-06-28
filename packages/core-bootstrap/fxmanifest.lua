fx_version 'cerulean'
game 'gta5'
node_version '22'

author 'Yava'
description 'core-bootstrap module'
version '1.0.0'

dependency 'core-logger'
dependency 'core-exports'

server_script 'dist/server/index.js'
client_script 'dist/client/index.js'
shared_script 'dist/shared-runtime/index.js'
