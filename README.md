# https-proxies

A http/https proxies list that update every 2 hours

## Website

See the proxy list as a table [here](https://yoannchb-pro.github.io/https-proxies/)

## Package

See the typescript package to get proxies with custom filters [here](https://github.com/yoannchb-pro/https-proxies/tree/main/package)

## BOT LOGS

Generation logs [here](./bot.logs)

```txt
Last update: Tue Jun 13 2023 00:47:45 GMT+0000 (Coordinated Universal Time)
Number of proxy: 220
Number of https proxy: 50
Number of http proxy: 170
Number of proxy by Anonymity: Unknown -> 0, Low -> 91, Average -> 32, High -> 97
Average speed: 705 ms
Countries (39): FI, US, VN, GB, DE, KR, PE, KZ, SG, IR, NL, JP, VE, PH, HK, TW, IN, ID, CH, FR, MX, RU, CA, CM, SV, BR, BO, TH, CZ, CO, PA, GT, EC, CN, AR, RO, PL, NG, BD
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
