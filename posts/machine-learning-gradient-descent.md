---
title: 'Gradient Descent'
---

The gradient algorithm allows you to find local minima by iteratively find the next lowest point from a given point, thereby following a path to a minimum.

w = w - alpha \* d/dw J(w,b)

b = b - alpha \* d/db J(w, b)

alpha = learning rate, or how big of a stap we take in any direction.

d/dw J(w,b) = deriviative of the cost function. Which direction you want to take your step. This is bascially the gradient of the line at a point (or tangent line) - a positive gradient means when we do w - w, we reduce w. See photo.

-- photo gradient descent

Repeat until convergence, or there isn't much change in the parameters for each step we take.

An important consideration is that we need to update w and b at the same time (simultaneously). ie, we don't update w to be used in the b update.

example of javascript gradient descent:
https://github.com/javascript-machine-learning/linear-regression-gradient-descent/blob/master/src/App.js

https://codepen.io/maxwell_alexius/pen/EwEVXj

# Learning Rate Alpha

If alpha is too small, the process is very slow - many steps.

If alpha is too big, risk of stepping over minimum and climbing peaks, may never reach minimum - may never converge, will diverge.

As we get near a local minimim, the steps become smaller (due to being multiplied by the learning rate.)

# Gradient Descent for Linear Regression
