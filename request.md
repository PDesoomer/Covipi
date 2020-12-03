
get all countries Name (for autocompletion) and name for the requests :

``` html
https://api.covid19api.com/countries
```
``` JSON
[
  {
    "Country": "Albania",
    "Slug": "albania",
    "ISO2": "AL"
  },
  {
    "Country": "Libya",
    "Slug": "libya",
    "ISO2": "LY"
  },
  {
      ...,
  }, 
  {
    "Country": "Poland",
    "Slug": "poland",
    "ISO2": "PL"
  },
  {
    "Country": "Réunion",
    "Slug": "réunion",
    "ISO2": "RE"
  }
]
```
---
To get cases updated for the world :
```html
https://api.covid19api.com/world/total
```
``` JSON
{
    "TotalConfirmed":64498634,
    "TotalDeaths":1492893,
    "TotalRecovered":41485124
}
```
---
To get all cases from day one for each ```country-slug``` :
```html
https://api.covid19api.com/dayone/country/south-africa
```

```json
[
  {
    "Country": "South Africa",
    "CountryCode": "ZA",
    "Province": "",
    "City": "",
    "CityCode": "",
    "Lat": "-30.56",
    "Lon": "22.94",
    "Confirmed": 1,
    "Deaths": 0,
    "Recovered": 0,
    "Active": 1,
    "Date": "2020-03-05T00:00:00Z"
  },
  {
    ...
  },
  {
    "Country": "South Africa",
    "CountryCode": "ZA",
    "Province": "",
    "City": "",
    "CityCode": "",
    "Lat": "-30.56",
    "Lon": "22.94",
    "Confirmed": 796472,
    "Deaths": 21709,
    "Recovered": 734305,
    "Active": 40458,
    "Date": "2020-12-02T00:00:00Z"
  }
]
```
Here for example, the first case appeared on ```March, 5th, 2020```

---
To get specific time frame for a ```country-slug``` for instance from ```2020-03-01``` to ```2020-04-01```: 
```html
https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
```
```JSON
[
  {
    "Country": "South Africa",
    "CountryCode": "ZA",
    "Province": "",
    "City": "",
    "CityCode": "",
    "Lat": "-30.56",
    "Lon": "22.94",
    "Cases": 0,
    "Status": "confirmed",
    "Date": "2020-03-01T00:00:00Z"
  },
  {
    ...,
  },
  {
    "Country": "South Africa",
    "CountryCode": "ZA",
    "Province": "",
    "City": "",
    "CityCode": "",
    "Lat": "-30.56",
    "Lon": "22.94",
    "Cases": 1380,
    "Status": "confirmed",
    "Date": "2020-04-01T00:00:00Z"
  }
]
```