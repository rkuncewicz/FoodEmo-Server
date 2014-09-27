'use strict'

var angular = require('angular');
var ngRoute = require('angular-route');
var appRoutes = require('./js/appRoute.js');
var MainCtrl = require('./js/controllers/MainCtrl.js');
var MainService = require('./js/services/MainService.js');
var ui = require('angular-bootstrap');

var app = angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService', 'ui.bootstrap']);

