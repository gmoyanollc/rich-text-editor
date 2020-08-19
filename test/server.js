#!/bin/env node

const express = require("express");
const fs = require("fs");
//const https = require("https");

const DEFAULT_IP = "127.0.0.1";
const DEFAULT_PORT = process.argv[3] || "5555";
const WEB_ROOT_FILE = process.argv[2];
const WEB_PUBLIC_DIR = process.cwd();

const App = function() {
  var self = this;
  self.setupVariables = function() {
    if (typeof process.env.IP === "undefined") {
      self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
      self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    } else {
      // c9 environment
      self.ipaddress = process.env.IP;
      self.port = process.env.PORT;
    }

    if (typeof self.ipaddress === "undefined") {
      self.ipaddress = DEFAULT_IP;
      self.port = DEFAULT_PORT;
    }
  };

  self.populateCache = function() {
    if (typeof self.zcache === "undefined") {
      self.zcache = { "index.html": "" };
    }
    self.zcache["index.html"] = fs.readFileSync(WEB_ROOT_FILE);
  };

  self.cache_get = function(key) {
    return self.zcache[key];
  };

  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log(
        "[INFO] received %s - terminating app ...", sig);
      process.exit(1);
    }
    console.log("[INFO] Node server stopped at %s.", Date(Date.now()));
  };

  self.setupTerminationHandlers = function() {
    process.on("exit", function() {
      self.terminator();
    });

    [
      "SIGHUP",
      "SIGINT",
      "SIGQUIT",
      "SIGILL",
      "SIGTRAP",
      "SIGABRT",
      "SIGBUS",
      "SIGFPE",
      "SIGUSR1",
      "SIGSEGV",
      "SIGUSR2",
      "SIGTERM"
    ].forEach(function(element, index, array) {
      process.on(element, function() {
        self.terminator(element);
      });
    });
  };

  self.createRoutes = function() {
    self.routes = {};

    self.routes["/asciimo"] = function(req, res) {
      var link = "http://i.imgur.com/kmbjB.png";
      res.send("<html><body><img src='" + link + "'></body></html>");
    };

    self.routes["/"] = function(req, res) {
      res.setHeader("Content-Type", "text/html");
      res.send(self.cache_get("index.html"));
    };

  };

  self.initializeServer = function() {
    self.createRoutes();
    self.app = express();
    self.app.use(express.static(WEB_PUBLIC_DIR))

    for (var r in self.routes) {
      self.app.get(r, self.routes[r]);
    }
  };

  self.initialize = function() {
    self.setupVariables();
    self.populateCache();
    self.setupTerminationHandlers();
    self.initializeServer();
  };

  self.start = function() {
    self.app.listen(self.port, self.ipaddress, function() {
      console.log("[INFO] Node server started at", Date(Date.now()));
      console.log("[INFO] public web root:", WEB_PUBLIC_DIR);
      console.log("[INFO] listening on [%s:%d](http://%s:%d) ...", self.ipaddress, self.port, self.ipaddress, self.port);
    });
  };
};

var zapp = new App();
zapp.initialize();
zapp.start();