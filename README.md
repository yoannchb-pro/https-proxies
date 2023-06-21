# https-proxies

A http/https proxies list that update every 2 hours

## Website

See the proxy list as a table [here](https://yoannchb-pro.github.io/https-proxies/)

## Package

See the typescript package to get proxies with custom filters [here](https://github.com/yoannchb-pro/https-proxies/tree/main/package)

## BOT LOGS

Generation logs [here](./bot.logs)

```txt
Last update: Wed Jun 21 2023 14:07:31 GMT+0000 (Coordinated Universal Time)
Number of proxy: 45
Number of https proxy: 10
Number of http proxy: 35
Number of proxy by Anonymity: Unknown -> 0, Low -> 23, Average -> 5, High -> 17
Average speed: 251 ms
Countries (20): SG, KR, US, FI, FR, HK, CH, GB, HU, AR, CL, DE, PE, CO, IR, RU, CA, BR, BO, VN
Success (4):
  - https://www.proxy-list.download
  - https://www.us-proxy.org
  - https://free-proxy-list.net/
  - https://geonode.com/free-proxy-list
Failed (1):
  - https://proxyscrape.com/free-proxy-list
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
