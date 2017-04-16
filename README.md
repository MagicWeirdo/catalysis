# Currently under construction

# Catalysis.js

## Install

```bash
$ npm install -g catalysis-init
```

## Create Project

enter the directory where you want your project to be located and write command:
```bash
$ catalysis-init new example-project
```

## Features

* Controller
* Model
* Service
* Middleware
* WebSocket
* Dependency Injection
* Routing
* REST API
* Static file serving
* Template Engine
* Multipart support
* Cache
* Email
* Validation
* Markdown
* Plugin

## Introduction

Here is an example of how to write a hello world application. Let's get started!

We first create a file named *HelloController.js* within folder *api/controllers/* and here we define the **Controller** with an **Action** named *hello*:
```javascript
module.exports = {
  hello: (req, res) => {
    res.end("Hello world!");
  }
}
```

After controller has been defined, then we have to define a route in order to routing *requests* to the action. Let's edit the **Configuration** *config/setting.js*:
```javascript
module.exports = {
  ...
  actions: [
    { method: "GET", url: "/", action: "HelloController.hello" }
  ]
  ...
}
```

That's it! Let's enter the command and run:
```sh
$ node app
```

Open browser and type the url "localhost:80", then you should see "Hello world!" in the page.

## Controllers

### Overview
Controllers (the **C** in **MVC**) are the objects in your Catalysis application that are responsible for responding to *requests* from a web browser, mobile application or any other system capable of communicating with a server. They often act as a middleman between your *services* and *views*.

### Actions
Controllers are comprised of a set of methods called *actions*. Actions are bound to routes in your application, so that when a client requests the route, the action is executed to perorm some bussiness logic and send a response. For example the *GET /hello* route in your application cound be bound to an action like:

```javascript
module.exports = {
  ...
  hello: function(req, res) {
    res.end("Hi there!");
  }
  ...
}
```

Any time a web browser is pointed to */hello* URL on your app's server, the page will display the message: "Hi there!".

### Where are controllers defined?

Controllers are defined in the *api/controllers/* folder. By convention, Catalysis controllers are usually **Pascal-cased**, so that every word in the filename (including the first word) is capitalized: for example, *UserController.js*, *MyController.js* and *SomeGreatBigController.js* are all valid, Pascal-cased names.

### What does a controller file look like?

A controller file defines a JavaScript dictionary (aka "plain object") whose keys are action names, and whose values are the corresponding action method. Here's a simple example of a full controller file:

```javascript
module.exports = {
  hi: function(req, res) {
    res.end("Hi there!");
  },
  byte: function(req, res) {
    res.redirect("http://www.example.com");
  }
}
```

This controller defines two actions: *hi* and *byte*. The *hi* action responds to request with a string message, while the *bye* action responds by redirecting to another web site.
