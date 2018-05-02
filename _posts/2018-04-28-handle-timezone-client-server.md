---
title: "How we handle time zone and locale at Zyllem"
categories: experience
---

Hi there, in the big application that supports user from multiple countries should always have the support for selecting timezone and even their locale somewhere. In Zyllem, as the SaaS company, this feature has been embedded inside the product since day 1.

What we have applied so far is to follow the best practice to store UTC date/times in our database and display to the user in their local timezone. We'll also store the time zone rather than the offset so we can support daylight savings time. In the post, I'll only cover how we display the date in the correct timezone as the server deliver the result via an API and we have the client app to consume it.

As described in the [timezone tag wiki](https://stackoverflow.com/tags/timezone/info), there are two different styles of time zones.

- Those provided by Microsoft for use with Windows and the .Net TimeZoneInfo class are identified by a value such as `Singapore Standard Time`.

- Those provided by IANA in the TZDB are identified by a value such as `Asia/Singapore`.

I did a quick test with Moment timezone, and basically most client-side library using standard IANA time zones. Refer to the resource below.

- [https://www.iana.org/time-zones](https://www.iana.org/time-zones)

- Completed IANA timezone list: [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

- Completed Microsoft timezone list: [https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones)

- Client library the support IANA: [https://stackoverflow.com/a/15171030/3375906](https://stackoverflow.com/a/15171030/3375906)

Which is very different from our technology since we are using Microsoft and it come with their timezone (Microsoft's one).

### So we came out with two solutions:

1. Server converts the timezone into IANA format and sends it to client using API. It doesn't sound convenience because, with every single Date object, we need to include another string property as a timezone, and the string is big. E.g `Singapore Standard Time`

2. Server converts the time into [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601). Then the client will to parse it and display.

ISO 8601 meaning it should always include either a `Z (for UTC values)`, or an `offset (for local values)`. Therefore, you may take the user's time zone into account, but the result you deliver should include the local offset so it is unambiguous.

For example, you have the UTC value `2018-04-28T03:00:00.00Z`, then in `Asia/Singapore` it should be `2018-04-28T11:00:00.00+08:00`. And that's what should be delivered over the API.

On the client-side, you can render that value for the user with a library like moment.js. For example:

```javascript
var string = moment.parseZone("2018-04-28T11:00:00.00+08:00").format("LLL");
```

See more about localized format at [https://momentjs.com/docs/#/displaying/format/](https://momentjs.com/docs/#/displaying/format/). 

So that we write a class to also handle both the locale and timezone. Basically, it will extract the locale from browser and display accordingly. For the getSafe function, refer to my [previous post here](http://trungk18.github.io/experience/uncaught-type-error/)

timezone.ts

```javascript
import { getSafe } from "./utils";

import * as moment from "moment";
export const DEFAULT_FORMAT = "DD MMM YYYY, HH:mm";
export const NUMERAL_DATE_TIME_ZONE_FORMAT = "L LT";
export const NAME_DATE_TIME_ZONE_FORMAT = "ll LT";
export const NAME_DATE_ONLY_ZONE_FORMAT = "ll";
export const NAME_DATE_TIME_ZONE_FULL_FORMAT = "llll";
export const TIME_ONLY_FORMAT = "LT";

export class MomentTimezone {
  //input format "2018-04-28T11:00:00.00+08:00"
  public static formatDateInTimeZone(input: string): string {
    let locale = getSafe(() => navigator.languages[0]) || navigator.language;
    let parsedTime = moment.parseZone(input);
    return locale
      ? parsedTime.locale(locale).format(NUMERAL_DATE_TIME_ZONE_FORMAT)
      : parsedTime.format(DEFAULT_FORMAT);
  }

  public static parseDateInTimeZone(input) {
    let locale = getSafe(() => navigator.languages[0]) || navigator.language;
    let parsedTime = moment.parseZone(input);
    return locale ? parsedTime.locale(locale) : parsedTime;
  }
}
```

So If I configure the browser language in Chinese, it will also display in the correct locale as well.

![How we store and display DateTime in the correct timezone and locale in Zyllem 01](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/configure-timezone-01.png)

![How we store and display DateTime in the correct timezone and locale in Zyllem 02](https://github.com/trungk18/trungk18.github.io/raw/master/img/blog/configure-timezone-02.png)