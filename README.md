# Bubble Test Servers

Designed for developers building on Bubble Protocol.  

Starts a local Ganache instance and a local ram-based Bubble Server for test purposes.

## Install

```bash
git clone git@github.com:Bubble-Protocol/test-servers.git
cd test-servers
npm i
npm start
```

## Configure

By default Ganache is run on port 8545 and the bubble server on port 8131.

You can change the configuration by editing `config.json`. The ganacheOptions are passed through transparently to Ganache.  See https://www.npmjs.com/package/ganache-cli.

## Using Bubble Tools?

Configure bubble tools to use `local` as your server alias in `bubble content` commands:

```bash
bubble servers add local http://127.0.0.1:8131
```

If you want to deploy or interact with contracts on the Ganache instance then edit your `~/.bubble-tools/providers` file and add the following chain:

```json
{
    "type": "http",
    "chainId": 1337,
    "chain": { "name": "ganache", "chainId": 1337, "networkId": 5777, "comment": "Local Ganache instance", "url": "https://ethstats.net/", "genesis": { "hash": "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3", "timestamp": null, "gasLimit": 5000, "difficulty": 17179869184, "nonce": "0x0000000000000042", "extraData": "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa", "stateRoot": "0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544" }, "hardforks": [ { "name": "chainstart", "block": 0, "consensus": "pow", "finality": null }, { "name": "homestead", "block": 1150000, "consensus": "pow", "finality": null }, { "name": "dao", "block": 1920000, "consensus": "pow", "finality": null }, { "name": "tangerineWhistle", "block": 2463000, "consensus": "pow", "finality": null }, { "name": "spuriousDragon", "block": 2675000, "consensus": "pow", "finality": null }, { "name": "byzantium", "block": 4370000, "consensus": "pow", "finality": null }, { "name": "constantinople", "block": 7280000, "consensus": "pow", "finality": null }, { "name": "petersburg", "block": 7280000, "consensus": "pow", "finality": null }, { "name": "istanbul", "block": 9069000, "consensus": "pow", "finality": null }, { "name": "muirGlacier", "block": 9200000, "consensus": "pow", "finality": null } ], "bootstrapNodes": [ { "ip": "13.93.211.84", "port": 30303, "id": "3f1d12044546b76342d59d4a05532c14b85aa669704bfe1f864fe079415aa2c02d743e03218e57a33fb94523adb54032871a6c51b2cc5514cb7c7e35b3ed0a99", "location": "US-WEST", "comment": "Go Bootnode" }, { "ip": "191.235.84.50", "port": 30303, "id": "78de8a0916848093c73790ead81d1928bec737d565119932b98c6b100d944b7a95e94f847f689fc723399d2e31129d182f7ef3863f2b4c820abbf3ab2722344d", "location": "BR", "comment": "Go Bootnode" }, { "ip": "13.75.154.138", "port": 30303, "id": "158f8aab45f6d19c6cbf4a089c2670541a8da11978a2f90dbf6a502a4a3bab80d288afdbeb7ec0ef6d92de563767f3b1ea9e8e334ca711e9f8e2df5a0385e8e6", "location": "AU", "comment": "Go Bootnode" }, { "ip": "52.74.57.123", "port": 30303, "id": "1118980bf48b0a3640bdba04e0fe78b1add18e1cd99bf22d53daac1fd9972ad650df52176e7c7d89d1114cfef2bc23a2959aa54998a46afcf7d91809f0855082", "location": "SG", "comment": "Go Bootnode" } ] },
    "name": "Local Ganache",
    "nickname": "ganache",
    "currency": "eth",
    "url": "http://127.0.0.1:8545"
  },
```

You can then use `-c ganache` in your calls to `bubble contract` and `bubble content`.

Note, if you place the above json as your first chain then it will become the default for all `bubble` commands and you will not need to give the `-c` option each time.