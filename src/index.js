/**
 * Copyright (c) 2023 Bubble Protocol
 * Distributed under the MIT software license, see the accompanying file COPYING or 
 * http://www.opensource.org/licenses/mit-license.php.
 */

import { createRequire } from "module";
import { startServers } from "./servers.js";
const require = createRequire(import.meta.url);
const CONFIG = require('../config.json');

console.trace = CONFIG.traceOn ? Function.prototype.bind.call(console.info, console, "[trace]") : function() {};
console.debug = CONFIG.debugOn ? Function.prototype.bind.call(console.info, console, "[debug]") : function() {};

main();

async function main() {
  try {

    process.on('SIGTERM', () => {
      stopServers();
    });

    process.on('SIGINT', () => {
      stopServers();
    });

    const {ganacheUrl, bubbleServerUrl} = await startServers(CONFIG);

    console.log('Servers started:')
    console.log(' - Ganache Server:', ganacheUrl);
    console.log(' - Bubble Server:', bubbleServerUrl);

  } catch (err) {
    console.error("fatal error: " + err);
    stopServers();
  }
}
