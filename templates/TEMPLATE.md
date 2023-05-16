# https-proxies

A http/https proxies list that update every 3 hours

## Proxies

```txt
Last update: {%= new Date(data.lastUpdate).toLocaleDateString() %}
Number of proxy: {%= data.count %}
Success ({%= data.successList.length %}):
{%_ for(const success of data.successList){ %}
  - {%= success _%}
{%_ } %}
Failed ({%= data.failedList.length %}):
{%_ for(const failed of data.failedList){ %}
  - {%= failed _%}
{%_ } %}
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
