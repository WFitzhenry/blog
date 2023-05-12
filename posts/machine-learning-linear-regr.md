---
title: 'Linear Regression'
---

An example of linear regression would be predicting house prices given the size of the house.

Some terminology:

- Training set - data used to train the model.
- ==x== input variable/feature. (size of the house).
- ==y== output variable/target variable (price of the house).
- ==m== number of training examples.
- ==(x, y)== single training example.
- ==(x(i), y(i))== the ith training example. (i refers to a specific data row).

Essentially, we are using our training set with a learning algorithm to produce a function (f), or model, that will accurately predict outputs.

## Example - housing prices

Here we start with a simple data set with only two data points - a house with 1000 square feet(sqft) sold for \$300,000 and a house with 2000 square feet sold for \$500,000. These two points will constitute our _data or training set_. In this example, the units of size are 1000 sqft and the units of price are 1000s of dollars.

| Size (1000 sqft) | Price (1000s of dollars) |
| ---------------- | ------------------------ |
| 1.0              | 300                      |
| 2.0              | 500                      |

You would like to fit a linear regression model through these two points, so you can then predict price for other houses - say, a house with 1200 sqft.

```python
# x_train is the input variable (size in 1000 square feet)
# y_train is the target (price in 1000s of dollars)
x_train = np.array([1.0, 2.0])
y_train = np.array([300.0, 500.0])
print(f"x_train = {x_train}")
print(f"y_train = {y_train}")
```

```
x_train = [1. 2.]
y_train = [300. 500.]
```

### Number of training examples `m`

You will use ==m== to denote the number of training examples. Numpy arrays have a ==.shape== parameter. ==x_train.shape== returns a python tuple with an entry for each dimension. ==x_train.shape[0]== is the length of the array and number of examples as shown below.

```python
# m is the number of training examples
print(f"x_train.shape: {x_train.shape}")
m = x_train.shape[0]
print(f"Number of training examples is: {m}")
```

```
x_train.shape: (2,)
Number of training examples is: 2
```

### Plotting the data

You can plot these two points using the ==scatter()== function in the ==matplotlib== library, as shown in the cell below. The function arguments ==marker== and ==c== show the points as red crosses (the default is blue dots). You can use other functions in the ==matplotlib== library to set the title and labels to display

```python
# Plot the data points
plt.scatter(x_train, y_train, marker='x', c='r')
# Set the title
plt.title("Housing Prices")
# Set the y-axis label
plt.ylabel('Price (in 1000s of dollars)')
# Set the x-axis label
plt.xlabel('Size (1000 sqft)')
plt.show()
```

![plot1](/images/machine-learning/plot1.png)

# Model function

The model function for linear regression (which is a function that maps from `x` to `y`) is represented as

`$f_{w,b}(x^{(i)}) = wx^{(i)} + b$`

# Cost Function

w, b = parameter of the model. adjust these during training to improve the model. Also called coefficients/weights

The lines fits the data = somewhat close to the actual points.

How do we find what these parameters should be?

How do we measure how well a line fits the data? Cost Function

Takes y-hat (predicted) - y (actual)

This difference is called the error.

The squared of the error.

Take the sum of the squares of all the errors.

-- photo Cost function : squared error cost function

A smaller j(w,b) means the model fits the data better.

The cost curve is like a soup bowl, which can be plotted similar to a contour curve for paramters w,b.

Finding the parameters that minimize the contour curve value is where machine learning comes. We can use an algorithm to find the correct parameters.
