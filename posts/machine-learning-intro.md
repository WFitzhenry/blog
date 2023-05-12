---
title: 'Introduction'
---

::: info
Machine learning can broadly be defined as the field of study that gives computers the ability to learn without being explicity programmed - Arthur Samuel, 1959.
:::

The more opportunities you give an algorithm to learn, the better it will be.

## Supervised Learning

Generally, algorithms that map an input value to a predicted output value by using examples for inputs and outputs are called supervised learning.

Some examples are:

- Spam filtering - input is an email, output is whether the email is spam or not (true/false).
- Speech recongniton - input is audio, output is text transcripts.
- Translation - input is English words, output is Spanish.

There are two main types of supervised learning - regression and classification.

### Regression

Here we predict a number from an infinite number of possible outputs. For example, predict a house price based on the size of the house.

### Classification

Here we predict a class/category from a small number of possible outputs.
Generally non-numeric, but classes can also be 0,1, for example.
In both cases, our algorithms learn from data labeled with the 'right' answers.

## Unsupervised learning

In unsupervised learning we try to find something interesting in unlabeled data.

This generally means clustering similar data together. But it's unsupervised because we aren't telling the algorithm in advance what output we expect.
Our input data only comes with inputs x, but not output labels y, and our algorithm has to find structure in the data.

Examples:

- clustering
- anomaly detection (finding unusual data points)
- dimensionality reduction (compress data using fewer numbers. Take big dataset and reduce into smaller dataset without losing information)
