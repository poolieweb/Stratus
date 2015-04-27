# Stratus

[![Build Status](https://travis-ci.org/poolieweb/Stratus.svg?branch=master)](https://travis-ci.org/poolieweb/Stratus)
[![NPM Version](http://img.shields.io/npm/v/stratus-shell.svg?style=flat)](https://www.npmjs.org/package/stratus-shell)

NodeJS command line utility for configuring cloud IaaS and PaaS systems (Focusing on Microsoft Azure in the first major release). 
Utilising a JSON config file to represent and abstract a system state and the deployment order in which its created and destroyed.

Features such as Parameters, Async, Config file pointers and Environment variables are planned.


Please note this is work in progress and is not yet finished.

## Installation

    $ npm install stratus-shell -g
   
## Usage

    $ stratus --help

## Config file schema example

The following command will show an example config file from the current installed version.

    $ stratus --help --example

To view the latest example files, navigate to this [folder](https://github.com/poolieweb/Stratus/tree/master/configs/examples)

