---
title: 'Multiple features'
---

We generally call all the inputs x1, x2, x3, x4. (size of house, #bedrooms, #floors, age of house)

xj = jth feature. (j number of variables).

x(i) = features of ith training example. Example - a list of 4 numbers (variables). Also known as a vector.

x(2) will be a vector for the variables for training example 2.

x3(2) = the 3rd variable of the 2nd training example.

# Model

Previously f(x) = wx +b

f(x) = w1x1 + w2x2 + w3x3 + b

For example

f(x) =
0.1 _ size + // for every additional sqr feet the price will increase by 10%
4 _ #bedrooms + // .. increase by 400%
10 _ floors +
-2 _ years +
base price

Generally:
f(x) = w1x1 + w2x2 + ... + wnxn + b

w = [w1, w2, w3,... wn] // row vector
b is a number
These are the paremeters of the model

x = [x1, x2, x3... xn]

f(x) = w.x + b

Multiple linear regression

# Vectorization

Parameters
w = [w1, w2, w3] n = 3
b is a number
x = [x1, x2, x3]

Without vectorization
f(x) = w1x1 + w2x2 + w3x3 + b

f = w[0] _ x[0] +
w[1] _ x[1] +
w[2] \* x[2] +
b

```python
f = 0
for j in range(0,n):
    f = f + w[j] * x[j]
f = f + b
```

With vectorization

```python
f = np.dot(w, x) + b
```

This uses GPU.

Using the for loop, calculates w[0] \* x[0] one after each other.

Using dot notation, in a single step it runs in parallel, then uses specialized hardware to add these up.

# Gradient Descent for Multiple Linear regression

-- photo Gradiet Descent n>= 2 features

# Cost Function

```python
def compute_cost(X, y, w, b):
    """
    compute cost
    Args:
      X (ndarray (m,n)): Data, m examples with n features
      y (ndarray (m,)) : target values
      w (ndarray (n,)) : model parameters
      b (scalar)       : model parameter

    Returns:
      cost (scalar): cost
    """
    m = X.shape[0]
    cost = 0.0
    for i in range(m):
        f_wb_i = np.dot(X[i], w) + b           #(n,)(n,) = scalar (see np.dot)
        cost = cost + (f_wb_i - y[i])**2       #scalar
    cost = cost / (2 * m)                      #scalar
    return cost
```

# Gradient descent with multiple variables

Essentially the same for univariate linear regression, but where the w vector parameters are updated simultaneosuly.

# Feature Scaling

A smaller feature input (number of bedrooms = 5), should have a higher parameter value (50), than a feature with a high input (sqr feet = 2000, paramter = 0.2).

A way to ensure more efficient effort is to scale the feature size to values between 0 and 1.

# Learning Curve

A learning curve plots the total cost of the updated parameters against the number of iterations gradient descent has taken.

A good rule of thumb is if the costs decreases by less than the learning rate, you can declare convergence.

# Feature Engineering

If we have two features for a house price, x1 = frontage and x2 = depth of the plot, we can also include another feature: the area (x1 \* x2) as one feature.

# Polynomial Regression

We can use feature engineering to create non-linear curves that may fit the data better.
