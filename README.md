# Meal App [![Build Status](https://travis-ci.org/bhosun/Mealapp.svg?branch=develop)](https://travis-ci.org/bhosun/Mealapp) [![Coverage Status](https://coveralls.io/repos/github/bhosun/Mealapp/badge.svg?branch=add-travis-build)](https://coveralls.io/github/bhosun/Mealapp?branch=add-travis-build)

Meal App is an Ecommerce web app, in which you select from the available Menu which a caterer has set perday place your order and checkout 

## Getting Started

# SETUP
Clone the Repo.
-------------
`git clone https://github.com/bhosun/Mealapp.git`
## Prerequisites
The following tools will be needed to run this application successfully:
* Node v10.15.0 or above
* Npm v6.4 or above
## Endpoints
- GET **api/v1/meals/** Caterers can get all meals options they uploaded
- POST **api/v1/meals/** Catereres can add meal options linked to their account
- PUT **api/vi/meals/:mealId** Caterers can update their meal options
- DELETE **api/v1/meals/:mealId** Caterers can delete their meal options
- GET **api/v1/menu/** Caterers and Users can Get the menu for the day
- POST **api/v1/menu/** Caterers can Set a menu for the day
- GET **api/v1/orders** Get All Orders
- POST **api/v1/orders** Users can make orders
- PUT **api/v1/orders/:orderId** Users can modify their orders
## INSTALLATION INSTRUCTION
**On your Local Machine**
- Pull the [develop](https://github.com/bhosun/Mealapp) branch off this repository
- Run `npm install` to install all dependencies
- Run npm start to start the app
- Access endpoints on **localhost:3000**
## Running the tests
Run `npm test` in the terminal for the cloned folder.
## Built With
* [Node.js](http://www.nodejs.org/) - Runtime-Enviroment
## Acknnowledgments
* Andela
* forloop Africa
## Authors
* **Olatunbosun Olabisi**
