# https-proxies

A http/https proxies list that update every 3 hours

## Proxies

```
Number of proxy: {% size %}
```

## Type

### JSON type

- lastUpdate: Date of the last update
- count: Number of proxies
- successList: list of url scrapped with success
- failedList: list of url scrapped without success
- proxies: proxy list

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
  anonimity: Anonymity;
  https: boolean;
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
