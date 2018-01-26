---
title: "The combination of debounce and throttle"
categories: experience
tags: jquery debounce throttle
---

Debounce and throttle are two techniques to control how many times we allow a function to be executed over time.

The real worl example could be:

- Wait until the user stops resizing the window
- Don't fire an ajax event until the user stops typing
- Measure the scroll position of the page and respond at most every 50ms
- Ensure good performance as you drag elements around in an app

> Throttling enforces a maximum number of times a function can be called over time. As in "execute this function at most once every 100 milliseconds."

Say under normal circumstances you would call this function 1,000 times over 10 seconds. If you throttle it to only once per 100 milliseconds, it would only execute that function at most 100 times

(10s * 1,000) = 10,000ms
10,000ms / 100ms throttling = 100 maximum calls

> Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. As in "execute this function only if 100 milliseconds have passed without it being called."

Perhaps a function is called 1,000 times in a quick burst, dispersed over 3 seconds, then stops being called. If you have debounced it at 100 milliseconds, the function will only fire once, at 3.1 seconds, once the burst is over. Each time the function is called during the burst it resets the debouncing timer.

> Quoting from [The Difference Between Throttling and Debouncing](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)

<iframe height='265' scrolling='no' title='Combination of throttling and debounce ' src='//codepen.io/trungk18/embed/dJEJYy/?height=265&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/trungk18/pen/dJEJYy/'>Combination of throttling and debounce </a> by Vo Tuan Trung (<a href='https://codepen.io/trungk18'>@trungk18</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

But what I want to archive current is kind of the combination between debounce and throttle.

Basically, our system has a long process that will fire a lot of update to the client. When I received the server command on the client,I will need additional HTTP requests back to server to get some information. So that It will hit the server back as long as the server sending me update.

I was using debounce to prevent sending too many requests back to the server If the time between two commands is within 1s. But there is one use case where the server constantly sending the update to the client in, e.g 10 minutes. Meaning the client will trigger the getItemCount at 10m 1s.

So that I came up with the idea of combo, which is the combination of both debounce and throttle.

1. Trigger the UI update immediately when receiving the first event sending from the server.
2. If there are more event to come, don't run the next event unless it is less than 1 second from the last event.
3. If the server keeps sending the event. Run the condition (2) above and do the update every 60 seconds.