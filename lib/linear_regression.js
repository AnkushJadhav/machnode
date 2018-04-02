/***********************************
Base class for implementing datsets

Ordinary Least Squares Regression (OLSR)
Linear Regression
Logistic Regression
Stepwise Regression
Multivariate Adaptive Regression Splines (MARS)
Locally Estimated Scatterplot Smoothing (LOESS)
************************************/

'use strict';

/*
SOURCE; https://medium.com/we-are-orb/multivariate-linear-regression-in-python-without-scikit-learn-7091b1d45905
FITTING =
1. Calculate mean = sum(data)/count(data)
2. Calculate variance = sum( (data - mean(data)) ^ 2)
3. Calculate std deviation = sqrt((1/count(data)) * sum((data - mean(data)) ^ 2))
4. Normalise data  = (data - mean(data))/std deviation(data)
5. Add a column of ones to the nomalised data
6. theta = array of 0s, length = length(data)
7. alpha = 0.01 //configurable?
8. iters = 1000 //configurable?
9. cost function(x, y, theta) =
	9.1. something = (x * transpose(theta)) - y) ^ 2
	9.2. return sum(something)/(2 * count(x))
10. gradient function(X,y,theta,iters,alpha) =
	10.1. cost = array of 0s, length - iters
	10.2. for 0 to iters-1
		10.2.1. theta = theta - (alpha/len(X)) * np.sum(X * (X @ theta.T - y), axis=0)
        10.2.2. cost[i] = computeCost(X, y, theta)
PREDICITING =
1. y =
*/
var mean = function(data) {
	var sum = data.reduce((a, b) => a + b, 0);
	return sum/data.length;
};
var variance = function(data) {
	var mean = mean(data);
	return data.reduce((a, b) => a + Math.pow((b - mean),2), 0);
};
var stdDeviation = function(data) {
	var mean = mean(data);
	var data = data.map(x => Math.pow((x - mean), 2));
	return Math.sqrt(data.reduce((a, b) => a + b, 0)/data.length);
};
var normalise = function(data) {
	var mean = mean(data);
	var stDev = stdDeviation(data);
	return data.map(x => (x - mean)/stDev);
};
var cost = function(data_X, data_Y, theta) {
	
};
module.exports.linearRegression = function(data_X, data_Y) {

};
