---
title: 'Classification'
---

Output will be one of a small number of possible outputs.

Often boolean outputs - is this spam? is this fraudulent? is this tumor malignant?

Where y can only be one of two values - binary classification. (class/category).

false / true
0 / 1
negative class / positive class
absence / presence

# Logistic Regresssion

sigmoid function / logistic function

Uses linear regression

f(x) = w.x + b

or z = w.x + b

g(z) = 1 / 1 + e(-z)
or
f(x) = 1 / 1 + e(-(w.x+b))

Logistic regresssion - outputs the probability that the class is 1.

-- photo of sigmoid function

# Decision Boundary

Boundary between x inputs where y = 1 or y = 0. Can be non-linear.
