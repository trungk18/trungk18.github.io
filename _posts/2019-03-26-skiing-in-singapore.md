---
title: "Skiing in Singapore - a coding diversion"
categories: algo
---

Hi there, it have been a while since my last post. Today I am re posting a quite interesting problem that I solved before. 

I read about this one on a [Senior Frontend JD](https://stackoverflow.com/jobs/162891/senior-front-end-engineer-redmart) on Stackoverflow. It looks promising so I decided to do it. You can read a step by step solution on my code. This is also my first time to use node API to read the local file.

## Source code

So basically it is a common tree traverse problem. I use the recursive function to solve it. I put my detail comment on the source code. Please help yourself. If there are any comments, just let me know.

If you managed to run it on your local, you will get the number which is represent for a real email that you could send your resume to. You will get more advantage from doing so If you want to join Redmart.

[Github](https://github.com/trungk18/algorithm-training/blob/master/001.%20Skiing%20in%20Singapore/app.ts)

```javascript
ReadFile.Read(__dirname, "map.txt", data => SkiingInSingapore.Main(data))

class SkiingInSingapore {
    //n m input
    private static n: number;
    private static m: number;

    //array to hold the 2 dimensions array of number;
    private static map: number[][] = [];

    //the expected result will be saved here
    private static maxLength: number = 0;
    private static maxDrop: number = 0;

    public static Main(data: string[]) {
        let [firstLine, ...restData] = data;
        let nm = splitString(firstLine);
        this.n = nm[0];
        this.m = nm[1];
        for (let i = 0; i < restData.length; i++) {
            this.map[i] = splitString(restData[i]);
        }

        for (var x = 0; x < this.n; x++) {
            for (var y = 0; y < this.m; y++) {
                //if the maxLength is greater then current value, no need to traverse
                if (this.maxLength < this.map[x][y]) {
                    this.traverse(x, y, 1, this.map[x][y]);
                }
            }
        }
        console.log(`Max length ${this.maxLength}, max drop ${this.maxDrop}`)
    }

    private static traverse(x: number, y: number, length: number, start: number) {
        //consider as x y axis, instead of doing 4 if block. we can think about it as
        //current point [x,y]
        //go up [x, y + 1], go right [x + 1, y], go down [x, y - 1], go left [x - 1, y]
        let xAxis = [0, 1, 0, -1];
        let yAxis = [1, 0, -1, 0];

        for (var k = 0; k < 4; k++) {
            //check if the moving is still inside the graph
            var isInsideGraph = x + xAxis[k] >= 0 && x + xAxis[k] < this.n && y + yAxis[k] >= 0 && y + yAxis[k] < this.m;
            if (isInsideGraph && (this.map[x][y] > this.map[x + xAxis[k]][y + yAxis[k]])) {

                //if can traverse and the current value is bigger the the next traverse point.
                //set the length and keep the start point. to calculate the maxlength and drop later.
                this.traverse(x + xAxis[k], y + yAxis[k], length + 1, start)
            }
        }

        //current drop
        var drop = start - this.map[x][y];
        if (length > this.maxLength) {
            this.maxLength = length;
            this.maxDrop = drop;
        }

        //the use case where by length is the same but the drop is greater
        if (length === this.maxLength && this.maxDrop < drop) {
            this.maxDrop = drop;
        }
    }
}

```

## Test

There are 2 text files, named corresponding as.

1. [test.txt](https://raw.githubusercontent.com/trungk18/algorithm-training/master/001.%20Skiing%20in%20Singapore/test.txt) - the 4x4 matrix as you see on the below problem

2. [map.txt](https://raw.githubusercontent.com/trungk18/algorithm-training/master/001.%20Skiing%20in%20Singapore/map.txt) - the 1000x1000 matrix

Just change the name on **app.ts** and you will get the result. I will add the unit test later.

## Problem

[Problem link](http://geeks.redmart.com/2015/01/07/skiing-in-singapore-a-coding-diversion/)

Sometimes it's nice to take a break and code up a solution to a small, fun problem. Here is one some of our engineers enjoyed recently. It's called Skiing In Singapore.

Well you can’t really ski in Singapore. But let’s say you hopped on a flight to the Niseko ski resort in Japan. Being a software engineer you can’t help but value efficiency, so naturally you want to ski as long as possible and as fast as possible without having to ride back up on the ski lift. So you take a look at the map of the mountain and try to find the longest ski run down.

In digital form the map looks like the number grid below.

```
4 4
4 8 7 3
2 5 9 3
6 3 2 5
4 4 1 6
```

The first line (4 4) indicates that this is a 4x4 map. Each number represents the elevation of that area of the mountain. From each area (i.e. box) in the grid you can go north, south, east, west - but only if the elevation of the area you are going into is less than the one you are in. I.e. you can only ski downhill. You can start anywhere on the map and you are looking for a starting point with the longest possible path down as measured by the number of boxes you visit. And if there are several paths down of the same length, you want to take the one with the steepest vertical drop, i.e. the largest difference between your starting elevation and your ending elevation.

On this particular map the longest path down is of length=5 and it’s highlighted in bold below: **9-5-3-2-1**.

There is another path that is also length five: **8-5-3-2-1**. However the tie is broken by the first path being steeper, dropping from 9 to 1, a drop of 8, rather than just 8 to 1, a drop of 7.

Your challenge is to write a program in your favorite programming language to find the longest (and then steepest) path on this map specified in the format above. It’s 1000x1000 in size, and all the numbers on it are between 0 and 1500.