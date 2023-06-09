# https-proxies

A full list of http/https proxies updated every 2 hours

## Installation

```
$ npm i @yoannchb/https-proxies
```

## Api

### Import

```ts
import { getProxy, waitProxiesUpdated } from "@yoannchb/https-proxies";
//or
const { getProxy, waitProxiesUpdated } = require("@yoannchb/https-proxies");
```

### Usage

#### getProxy

Get a proxy

```ts
enum Anonymity {
  UNKNOWN = 0,
  LOW = 1,
  AVERAGE = 2,
  HIGH = 3,
}

type Proxy = {
  ip: string;
  port: number;
  country: string;
  anonymity: Anonymity;
  https: boolean;
  speed: number;
};

const proxy = await getProxy(filters: Filters = {}): Proxy
```

Filters:

- `port`: number[] -> the port you want
- `country`: string[] -> the country you want for example "FR", "CA" ...
- `anonymity`: Anonymity[] -> from 0 to 3 (0 = unknown, 1 = low, 2 = average, 3 = high)
- `https`: boolean -> If you want an https or http proxy
- `maxSpeed`: number -> maximum speed of the proxy

#### waitProxiesUpdated

Wait the proxy list is updated if you don't get any result (can take 2 hours !)

```ts
await waitProxiesUpdated();
```
