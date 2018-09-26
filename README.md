# Fastchop
[![Maintainability](https://api.codeclimate.com/v1/badges/181a862e781120cf1663/maintainability)](https://codeclimate.com/github/emmygozi/Fastchop/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/181a862e781120cf1663/test_coverage)](https://codeclimate.com/github/emmygozi/Fastchop/test_coverage) [![Coverage Status](https://coveralls.io/repos/github/emmygozi/Fastchop/badge.svg?branch=develop)](https://coveralls.io/github/emmygozi/Fastchop?branch=develop)
[![Build Status](https://travis-ci.com/emmygozi/Fastchop.svg?branch=develop)](https://travis-ci.com/emmygozi/Fastchop)


Fastchop is a food delivery service app for a restaurant.

## Template
Template hosted at https://emmygozi.github.io/Fastchop/UI/

## API hosted on
API Hosted on https://fastchop.herokuapp.com/api/v1/


## Table of Contents

 
 
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    * [Development](#development)
* [Features](#features)
* [API Endpoints](#api-endpoints)
 * [Technologies](#technologies)

 
### Pivotal Tracker Stories
Find relevant Pivotal Tracker stories at [https://www.pivotaltracker.com/projects/2196733)

## Getting Started

### Installation

* git clone
  [Fastchop](https://github.com/emmygozi/Fastchop.git)
* Run `npm install or yarn install` to install packages
* Run `npm run createtables or yarn createtables ` to setup local database
* Run `npm run start or yarn start` to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Testing with Coverage Data

* After installing as shown 

* Run `npm test or yarn test`
* It will run test and display coverage data as generated by
  Istanbul's [nyc](https://github.com/istanbuljs/nyc)

### Development
You can run `npm run start:dev or yarn start:dev` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) watches for file changes and restarts your code. 

## Features

### Admin
* Sign Up
* Sign In
* Create  fast-food items
* Modify  fast-food items
* Delete  fast-food items
* Accept orders
* Reject orders


### Users
* Sign Up
* Sign In
* Make orders
* View order history

### API Endpoints
<table>
	<tr>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
		<th>EXPECTED RESPONSE</th>
	</tr>
	<tr>
		<td>GET /</td>
		<td>/api/v1/orders</td> 
		<td>Fetch all orders</td>
		<td>{
    "message": "Retrieved all orders",
    "myOrder": [
        {
            "id": 1,
            "userid": 3,
            "mealid": 6,
            "quantity": 3,
            "status": 1
        },
        {
            "id": 2,
            "userid": 4,
            "mealid": 7,
            "quantity": 1,
            "status": 0
        },
        {
            "id": 3,
            "userid": 5,
            "mealid": 8,
            "quantity": 4,
            "status": 2
        }
    ]
}</td>
	</tr>
	<tr>
		<td>GET /:id</td>
		<td>/api/v1/orders/:id</td> 
		<td>Fetch a specified order</td>
		<td>{
            "id": 1,
            "userid": 3,
            "mealid": 6,
            "quantity": 3,
            "status": 1
        }</td>
	</tr>
	<tr>
		<td>POST /</td>
		<td>/api/v1/orders</td> 
		<td>Make an order</td>
		<td>
		{
            "userid": 3,
            "mealid": 6,
            "quantity": 3,
            "status": 1
        }
		</td>
	</tr>
	<tr>
		<td>PUT /:id</td>
		<td>/api/v1/orders/:id</td> 
		<td>Modify an order</td>
		<td>
		{
            "userid": 3,
            "mealid": 6,
            "quantity": 3,
            "status": 1
        }
		</td>
	</tr>
	<tr>
		<td>DELETE /:id</td>
		<td>/api/v1/orders/:id</td> 
		<td>Delete an order</td>
		<td>{
            "id": 1,
            "userid": 3,
            "mealid": 6,
            "quantity": 3,
            "status": 1
        }
		</td>
	</tr>
	<tr>
		<td>GET /</td>
		<td>/api/v1/fooditem</td> 
		<td>Fetch all food item</td>
		<td>{
    "message": "Retrieved all food items",
    "foodItem": [
        {
            "id": 1,
            "name": "Extra large pizza",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1500,
            "imageurl": "http://imagesavedhere1"
        },
        {
            "id": 2,
            "name": "Burger and soda",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1500,
            "imageurl": "http://imagesavedhere2"
        },
        {
            "id": 3,
            "name": "Fried Chicken",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1000,
            "imageurl": "http://imagesavedhere3"
        }
    ]
}
		</td>
	</tr>
	<tr>
		<td>GET /:id</td>
		<td>/api/v1/fooditem/:id</td> 
		<td>Fetch a specified food item</td>
		<td>
		{
            "id": 3,
            "name": "Fried Chicken",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1000,
            "imageurl": "http://imagesavedhere3"
        }
		</td>
	</tr>
	<tr>
		<td>POST /</td>
		<td>/api/v1/fooditem</td> 
		<td>Make an food item</td>
		<td>{
            "id": 7,
            "name": "Fried Chicken",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1000,
            "imageurl": "http://imagesavedhere3"
        }</td>
	</tr>
	<tr>
		<td>PUT /:id</td>
		<td>/api/v1/fooditem/:id</td> 
		<td>Modify an food item</td>
		<td>
		{
            "id": 3,
            "name": "Fried Chicken",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1000,
            "imageurl": "http://imagesavedhere3"
        }
		</td>
	</tr>
	<tr>
		<td>DELETE /:id</td>
		<td>/api/v1/fooditem/:id</td> 
		<td>Delete an food item</td>
		<td>
		{
            "id": 3,
            "name": "Fried Chicken",
            "description": "Get your meals on the go in the most efficient manner. Our snacks are very tasty",
            "price": 1000,
            "imageurl": "http://imagesavedhere3"
        }
		</td>
	</tr>
</table>

## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [Yarn](https://yarnpkg.com/lang/en/) - Dependency Manager
* [Npm](https://www.npmjs.com/) - Dependency Manager

### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator



