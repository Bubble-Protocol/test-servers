/**
 * Copyright (c) 2023 Bubble Protocol
 * Distributed under the MIT software license, see the accompanying file COPYING or 
 * http://www.opensource.org/licenses/mit-license.php.
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const CONFIG = require('../config.json');
import { BLOCKCHAIN_SERVER_URL, BUBBLE_SERVER_URL, BUBBLE_WS_SERVER_URL, startServers, stopServers } from "./test-servers.js";

console.trace = CONFIG.traceOn ? Function.prototype.bind.call(console.info, console, "[trace]") : function() {};
console.debug = CONFIG.debugOn ? Function.prototype.bind.call(console.info, console, "[debug]") : function() {};


main();

async function main() {
  try {
    startServers()
      .then(status => {
        console.log('Ganache Server:', BLOCKCHAIN_SERVER_URL);
        console.log('HTTP Bubble Server:', BUBBLE_SERVER_URL);
        console.log('WebSocket Bubble Server:', BUBBLE_WS_SERVER_URL);
      })
      .catch(console.error);

    process.on('SIGTERM', () => {
      stopServers();
    });

    process.on('SIGINT', () => {
      stopServers();
    });

  } catch (err) {
    console.error("fatal error: " + err);
  }
}
