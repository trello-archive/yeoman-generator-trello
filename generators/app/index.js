'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('Trello') + ' generator!'
    ));

    this.log("If you don't know your application key, you can get yours at: https://trello.com/app-key");

    var prompts = [{
      type: 'input',
      name: 'applicationKey',
      message: 'What is your application key?',
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
    },

    projectfiles: function () {
	  this.fs.copyTpl(
      	this.templatePath('index.html'),
      	this.destinationPath('index.html'),
      	{ key: this.props.applicationKey }
      );
      this.fs.copy(
      	this.templatePath('main.js'),
      	this.destinationPath('main.js')
      );
    }
  },

  install: function () {
    this.npmInstall();
  }
});
