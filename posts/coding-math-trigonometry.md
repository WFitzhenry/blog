---
title: 'Intro to Trigonometry'
socialImage: images/circle.jpeg
topLevel: true
topLeveLTitle: 'Coding Math'
---

Trigonometry is the study of triangles. In particular it is the study the relationship between the angles and the sides of a triangle.

First lets look at ==right triangles==. A right triangle is triangle that has one right angle, or an angle equal to 90 degrees.

![rightangle](/images/right-angle-triangle.jpeg)

The hypotenuse is always the longest side of the triangle, and is the side opposite the right angle.

The side opposite A is the opposite, and the one next to it is called the adjacent.

There are three main trigometric functions - sin, cosine, tangent. These are essentially ratios.

For each of these, we will get a number between -1 and 1, which is the ==sin/cos/tan of that angle==.

==sinA = opp / hyp==

==cosA = adj / hyp==

==tanA = opp / adj==

or ==SOHCAHTOA==

Lets map out `Sin` values on a coordinate system:

![sin](/images/sin.jpeg)

We can take these values and plot them on this graph, called a sin wave:

![sinwave](/images/sinwave.jpeg)

Remember, on a canvas, we don't use the cartesian plain. On the y axis, we start at 0 at the top, and increase as we go down.

This changes the way we calculate angles. Instead of a 30 angle drawn in the positive quarter of the cartesian plain, the angle
is drawn downwards due to the reversed polarity.

![angles](/images/angles.jpeg)

We also need to change the way we measure angles.

![radian](/images/radian.jpeg)

A radian = 57.3 degrees. We get this value by wrapping the radius length around a circle - the angle of the arc it creates will be 57.3.

If continue to wrap the radius around the circle, it will be wrapped around 6.28 times, or 2 PI.

To convert between degrees and radians:

```
degrees = radians * 180 / PI

radians = degrees * pi / 180
```

/i/https://codepen.io/WarrenFitzhenry/embed/KKaxZrd?default-tab=js%2Cresult
