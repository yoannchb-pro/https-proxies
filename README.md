# https-proxies

A http/https proxies list that update every 2 hours

## Website

See the proxy list as a table [here](https://yoannchb-pro.github.io/https-proxies/)

## Package

See the typescript package to get proxies with custom filters [here](https://github.com/yoannchb-pro/https-proxies/tree/main/package)

## BOT LOGS

Generation logs [here](./bot.logs)

```txt
Last update: Mon Jun 19 2023 06:11:40 GMT+0000 (Coordinated Universal Time)
Number of proxy: 97
Number of https proxy: 8
Number of http proxy: 89
Number of proxy by Anonymity: Unknown -> 0, Low -> 39, Average -> 18, High -> 40
Average speed: 927 ms
Countries (30): US, KR, DE, CA, BR, RU, ID, PE, TW, GB, VN, KZ, SG, SV, HK, IN, FR, NL, JP, FI, CO, AR, VE, MO, CH, IR, SE, CL, PL, EG
Success (5):
  - https://www.proxy-list.download
  - https://www.us-proxy.org
  - https://proxyscrape.com/free-proxy-list
  - https://free-proxy-list.net/
  - https://geonode.com/free-proxy-list
Failed (0):
```

## Type

### JSON type

- lastUpdate: Date of the last update
- count: Number of proxies
- successList: List of url scrapped with success
- failedList: List of url scrapped without success
- proxies: List of proxy

```ts
type JSONProxy = {
  lastUpdate: string;
  count: number;
  successList: string[];
  failedList: string[];
  proxies: Proxy[];
};
```

### Proxy type

- speed: Speed time in ms (can be null)

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
```

## Quick Access

### JSON

```
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.json" > proxies.json
```

### CSV

```
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.csv" > proxies.csv
```

### Text

```
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/main/proxies.txt" > proxies.txt
```
