# https-proxies

A http/https proxies list that update every 2 hours

## BOT LOGS

```txt
Last update: Tue May 16 2023 20:03:45 GMT-0400 (heure d’été de l’Est nord-américain)
Number of proxy: 1160
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
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/master/proxies.json" > proxies.json
```

### CSV

```
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/master/proxies.csv" > proxies.csv
```

### Text

```
$ curl "https://raw.githubusercontent.com/yoannchb-pro/https-proxies/master/proxies.txt" > proxies.txt
```
