---
title: "Find a sequence to produce a number by adding 5 or multiplying by 3"
categories: javascript 
---

Just read an interesting problem this morning. It seems not to be difficult.

Starting from the number 1 and repeatedly either adding 5 or multiply by 3, an infinite amount of new number can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produce that number? For example, the number of 13 could be reached by first multiplying by 3, and then adding 5 twice. Whereas the number 15 cannot be reached at all.

What came first to my mind is very obvious, recursive function. It doesn't find the shortest sequence of operation. It is satisfied when it finds a sequence.

<p data-height="265" data-theme-id="0" data-slug-hash="baKamv" data-default-tab="js,result" data-user="trungk18" data-embed-version="2" data-pen-title="baKamv" class="codepen"> See the Pen <a href="https://codepen.io/trungk18/pen/baKamv/"> baKamv </a> by Vo Tuan Trung ( <a href="https://codepen.io/trungk18"> @trungk18 </a> ) on <a href="https://codepen.io"> CodePen </a> . </p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"> </script>

The inner function find does the actual recursing. It takes two arguments - the current number and a string that records how we reached this number. And return either a string or null.

It will perform one of three actions.

- If the current number is the target number, the current history is a way to reach that target, so it is simply returned.
- If the current number is greater than the target number, simple return null because we will never reach the target from here.
- If the current number is below the target number, the function tries both possible paths that start from the current number, by calling itself twice, once for each of the allowed next steps.

My approach is starting from 1 and try to reach the target number. But the problem could be resolved by starting from the target number and try to reach 1. It is going to be a lot easier. You can see more from [here](https://codereview.stackexchange.com/questions/55838/find-sequence-by-adding-5-or-multiplying-by-3)