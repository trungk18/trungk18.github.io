---
title: "Limit the number of simultaneous ajax requests"
categories: experience
tags: fetch jquery
---

Recently, we changed to use HTTP2. And some specific area, there could be a few hundreds of request will be fire. I want to limit the number of simultaneous requests to 100, and queue up the rest. I came up with a simple function for doing so.

```javascript
var lazyLoadLimitCall = (function () {
    const MAX_PARALLEL_CALL = 100;
    var queue = [];
    var activeCall = 0;

    function queueRequest(url) {
        queue.push(url);    
        checkQueue();
    }

    function onPromiseCompleteOrFailure() {
        activeCall--;
        checkQueue();            
    }

    function checkQueue() {
        if (queue.length && activeCall < MAX_PARALLEL_CALL) {                    
            let url = queue.shift();  
            if (!url) {
                return;
            }

            activeCall++;                
            
            fetch(url).then(res => res.json())
              .then(response => {
                onPromiseCompleteOrFailure();
                //TODO Write your custom logic here
                console.log('Success:', JSON.stringify(response))
              })
              .catch(error => {
                onPromiseCompleteOrFailure();
                console.error('Error:', error)
              });
        }
    }

    return {
        addRequest: queueRequest
    };
})();

//Usage. call addRequest(url)
lazyLoadLimitCall.addRequest("https://example.com/profile")
lazyLoadLimitCall.addRequest("https://example.com/profile")
```

I first pushed all request url to a queue with a function called `addRequest` and call `checkQueue`. `checkQueue` checks to see if there are items in the queue and if the number of active requests is less than `MAX_PARALLEL_CALL`. If these conditions are met, it pops a request from the queue and turns it into a real AJAX request. Then it attaches a done handler to the request that decreases the active request count and calls `checkQueue`.
