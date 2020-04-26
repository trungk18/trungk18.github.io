---
title: "Lesson learn from Git branches"
categories: experience
tags: angular typescript
---

Recently our lead architect at [Zyllem](https://www.zyllem.com/) did a review on the collaborating process using Git. And the conclusion is, we are not great but not terrible.

We need to do a better job of managing our development branches. The goal of the game is to have as **short-lived** branches as possible (i.e. integrate often) while keeping the common branches (dev/patch) as stable as possible. Ex:

**Version 1.0 (a new sprint)**:

<u>Story 1</u>: As a user, I can calculate stuff (5d)

- Do the server work (dev1)
- Do the client UI (dev2)

<u>Story 2</u>: As a user, I can do a new cool thing (1d)

- Do the server work (dev2)

<u>Bug 1</u>: Something doesn’t work (5m / dev2)

<u>Bug 2</u>: Fix another bug (30m / dev2)

<u>Bug 3</u>: Fix yet another bug (1h / dev3)

Currently, most of us would branch like this at the beginning of the sprint:

- development
- dev1-version-1.0 (based on development)
- dev2-version-1.0 (based on development)
- dev3-version-1.0 (based on development)

## The problem

This branching strategy is simple but it leads to a lot of problems… typically (we have this all the time) dev3 needs the fix done for the bug2 to help to fix his bug3, since this fix is in the `dev2-version-1.0` branch he will merge that branch into his (dev3-version-1.0). But dev2 was working on both story 1 and 2 in his same branch, so his branch also includes some codes from the dev1 branch (the first work in progress commit of the server part of story 1). So now all branches are one big pile of half baked changes and no one understands what is going on (so we pull from each other until the thing compiles).

## The consequence

Now we have to wait until 5 issues are fully done to be able to merge this mess back to development (last day of the sprint), then QA will have to happen on Saturday. If we realize that Bug 2 will not take 30 minutes but 2 days we cannot postpone it (or we have to cherry-pick stuff in the messy branch). If we decide to postpone all 5 issues to the next sprint (version 1.1) now we have a set of branches with the wrong name (and trust me it’s easy to screw up a merge when we have 10 people doing that over 2-3 releases running in parallel).

## The solution

What we need to do is make a clear distinction between major stories and “nuggets”. Major stories are things that are either big or involving multiple devs (ex: Story 1, probably Story 2 unless it is straight-forward). For these, we need to create features branches. Depending on the complexity of the work for each of the devs collaborating on the branch, they can choose to collaborate directly on the branch or to branch off the common feature branch. Nuggets are the many small bugs that are not worth creating a whole branch for (just do one, call it `dev1-version-1.0` and fix those right in it, in a day). Branches for the above sprint could look like this:

- development
- story-1 (based on development)
- dev1-story1 (based on story-1) <--optional (depends on the complexity of server work)
- dev2-story1 (based on story-1) <--optional (same)
- dev2-version-1.0 <-- for story 2 and the 2 bugs, since all can be done in 1-2 days easily
- dev3-version-1.0 <-- will wait for dev2-version-1.0 to be merged on dev (no pull from dev2 branch)

This way if story 1 is delayed, no problem. If dev3 needs the thing from dev2 it should be available on development soon (worse case he can branch off dev2 branch and fix the issues there directly). The QA can start testing Story 2 and some bugs from the very beginning of the sprint…

You can also create a new branch for each ticket you work on. But there could be many simple bug fixing that only required small changes. That's why you should just combine a few of them and create a pull request at the end of the day. Checkout multiple branches could be time-consuming and you will have to clean them up on remote eventually.

Anyway, next time you create a branch called `my-name-some-version` ask yourself if you do it for nuggets or not. Next time you need a commit from someone else’s branch, figure out how to get this to your branch only by pulling from your upstream (the branch yours is based off). If you keep pulling from all over the place, one day you will end up in a post-release email.

Thanks [Florian](http://hiring.alsocan.la/) for contributing to this great practice.
