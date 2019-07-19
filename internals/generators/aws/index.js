/**
 * AWS Generator
 */

// const componentExists = require("../utils/componentExists");

module.exports = {
  description: 'Add an AWS Resource Generator ',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the model :',
      default: 'Stateless Function',
      choices: () => [
        'AWS Resource Controller',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      // default: "Form",
      // validate: value => {
      //   if (/.+/.test(value)) {
      //     return componentExists(value)
      //       ? "A component or container with this name already exists"
      //       : true;
      //   }

      //   return "The name is required";
      // }
      },
    {
    type: 'input',
    name: 'awsName',
    message: 'What AWS service you would like to instantiate? Name must be exact name as AWS Service.',
    // default: "Form",
    // validate: value => {
    //   if (/.+/.test(value)) {
    //     return componentExists(value)
    //       ? "A component or container with this name already exists"
    //       : true;
    //   }

    //   return "The name is required";
    // }
      },
    {
      type: 'input',
      name: 'awsFnName',
      message: 'What First AWS function you would like to call? Name must be exact name as AWS function.',
      // default: "Form",
      // validate: value => {
      //   if (/.+/.test(value)) {
      //     return componentExists(value)
      //       ? "A component or container with this name already exists"
      //       : true;
      //   }

      //   return "The name is required";
      // }
    },
    {
      type: 'confirm',
      name: 'wantParams',
      default: true,
      message: 'Do you want to start with a parameter list for your aws controller?',
    },
    {
      type: 'confirm',
      name: 'wantRoutes',
      default: true,
      message: 'Do you want Routes?',
    },
    {
      type: 'confirm',
      name: 'wantController',
      default: true,
      message:
        'Do you want a controller for this model?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var awsTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        awsTemplate = './container/stateless.js.hbs';
        break;
      }
      default: {
        awsTemplate = './container/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../server/api/aws/{{properCase name}}/tests/index.test.js',
        templateFile: './api/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If api needs params,route and controller
    if (data.wantParams) {
      actions.push({
        type: 'add',
        path: '../../server/api/aws/{{properCase name}}/params/params.{{ name }}.js',
        templateFile: './aws/params/params.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantRoutes) {
      actions.push({
        type: 'add',
        path: '../../server/api/aws/{{properCase name}}/routes.js',
        templateFile: './aws/routes.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantController) {
      actions.push({
        type: 'add',
        path: '../../server/api/aws/{{properCase name}}/controller.js',
        templateFile: './aws/controller.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/api/aws/',
    });

    return actions;
  },
};
