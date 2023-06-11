# https-proxies

A http/https proxies list that update every 2 hours

## Website

See the proxy list as a table [here](https://yoannchb-pro.github.io/https-proxies/)

## Package

See the typescript package to get proxies with custom filters [here](https://github.com/yoannchb-pro/https-proxies/tree/main/package)

## BOT LOGS

Generation logs [here](./bot.logs)

```txt
Last update: Sun Jun 11 2023 00:53:12 GMT+0000 (Coordinated Universal Time)
Number of proxy: 1345
Number of https proxy: 135
Number of http proxy: 1210
Number of proxy by Anonymity: Unknown -> 0, Low -> 278, Average -> 277, High -> 790
Average speed: 641 ms
Countries (302): FI, RS, UA, US, GB, HK, SG, CN, ID, IT, JP, TR, DE, KR, VN, BD, IN, AU, FR, BR, MX, SE, AL, NP, NO, MY, EG, CO, CA, TZ, UG, PY, TH, GQ, AR, RU, IR, SV, CZ, ES, TW, NL, CL, GE, PE, PL, HN, RW, BO, GT, IL, KG, KH, CH, BE, HU, CM, LT, MM, DO, PA, KZ, YT, CR, EC, ZA, PT, PH, GR, RO, BG, MZ, IE, VE, UZ, SN
Success (3):
  - https://www.proxy-list.download
  - https://www.us-proxy.org
  - https://proxyscrape.com/free-proxy-list
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
