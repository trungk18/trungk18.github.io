---
title: "Limit the number of simultaneous ajax requests"
categories: experience
tags: fetch jquery
---

Recently, we changed to use HTTP2 and our DevOps told me that there are some limitations of the current platform. In some specific area, there could be a few hundreds of request will be fired in parallel and could cause the system freeze. He wanted to limit the number of simultaneous requests to 100, and queue up the rest. I came up with a simple function for doing so.

```javascript
var lazyLoadAjaxManager = (function () {
    const MAX_PARALLEL_CALL = 100;
    var queue = []; //to store the URL
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
        if (queue.length && activeCall <= MAX_PARALLEL_CALL) {                    
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

//To use -> call addRequest(url). Usually for a large number of request, we will do it inside a loop. E.g
// for (const userId of userIds) {
//     lazyLoadAjaxManager.addRequest(`https://example.com/user/${userId})
// }

lazyLoadAjaxManager.addRequest("https://example.com/request1")
lazyLoadAjaxManager.addRequest("https://example.com/request2")
lazyLoadAjaxManager.addRequest("https://example.com/request3")
lazyLoadAjaxManager.addRequest("https://example.com/request4")
```

Basically, I first pushed all request url to a queue with a function called `addRequest` and call `checkQueue`. `checkQueue` checks to see if there are items in the queue and if the number of active requests is less than `MAX_PARALLEL_CALL`. If these conditions are met, it pops a request from the queue and turns it into a real AJAX request. Then it attaches a done handler to the request that decreases the active request count and calls `checkQueue`.
