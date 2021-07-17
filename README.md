# dht-keyvalue-browser
Use a browser to store key-value pairs on the mainline bittorrent DHT network, and retreive/update them by key name

Unfortunately, browsers do not support UDP to directly write or read data from the bittorrent mainline DHT. 

As an intermediary solution, this small library ships an express server that leverages [dht-keyvalue](https://www.npmjs.com/package/dht-keyvalue) to put, get and update mutable DHT on the bittorrent network.

