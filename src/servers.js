import { blockchainProviders } from "@bubble-protocol/core";
import { GanacheServer } from "./ganache/GanacheServer.js";
import { RamBasedBubbleServerWebSocket } from "./bubble/RamBasedBubbleServerWs.js";
import { RamBasedBubbleServer } from "./bubble/RamBasedBubbleServer.js";
import Web3 from "web3";


let ganacheServer, bubbleServer;


export async function startServers(config={}) {
  const ganacheUrl = await startGanache(config.ganacheOptions);
  const bubbleServerUrl = await startBubbleServer(ganacheUrl, config.bubbleServerOptions);
  return {ganacheUrl, bubbleServerUrl};
}

export function stopServers() {
  if (bubbleServer) bubbleServer.close();
  if (ganacheServer) ganacheServer.close();
}

async function startGanache(options={}) {
  const hostname = options.server ? options.server.host || '127.0.0.1' : '127.0.0.1';
  const port = options.port || 8545;
  ganacheServer = new GanacheServer(port, options);
  await ganacheServer.start();
  return 'http://'+hostname+':'+port
}

async function startBubbleServer(ganacheUrl, options={}) {
  let protocol = options.protocol || 'http:';
  if (protocol.slice(-1) !== ':') protocol += ':';
  const hostname = options.hostname || '127.0.0.1';
  const port = options.port || 8131;
  const blockchainProvider = new blockchainProviders.Web3Provider(options.chainId || 1, new Web3(ganacheUrl), options.accVersion || '0.0.2');
  bubbleServer = 
    protocol === 'ws:'
    ? new RamBasedBubbleServerWebSocket('ws://'+hostname, options.port || 8131, blockchainProvider)
    : new RamBasedBubbleServer('http://'+hostname, options.port || 8131, blockchainProvider);
  await bubbleServer.start();
  return protocol+'//'+hostname+':'+port
}
