/**
 * API Generator
 */

// const componentExists = require("../utils/componentExists");

module.exports = {
  description: 'Add an API ',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the model :',
      default: 'Stateless Function',
      choices: () => [
        'Mongoose API',
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
      type: 'confirm',
      name: 'wantModel',
      default: true,
      message: 'Do you want to start with a model for your Data schema?',
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
    {
      type: 'confirm',
      name: 'wantDummyData',
      default: false,
      message: 'Do you want dummy data for the model? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantSocket',
      default: true,
      message: 'Do you want a Socket for this model?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var apiTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        apiTemplate = './container/stateless.js.hbs';
        break;
      }
      default: {
        apiTemplate = './container/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../server/api/{{properCase name}}/tests/index.test.js',
        templateFile: './api/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If api needs model,route and controller
    if (data.wantModel) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/model.js',
        templateFile: './api/model.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantRoutes) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/routes.js',
        templateFile: './api/routes.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantController) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/controller.js',
        templateFile: './api/controller.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantDummyData) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/dummyData.js',
        templateFile: './api/dummyData.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantSocket) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/socket.js',
        templateFile: './api/socket.js.hbs',
        abortOnFail: true,
      });
      // actions.push({
      //   type: 'append',
      //   path: '../../server/util/socketio-server.js',
      //   pattern: '/#socket_connect/g',
      //   templateFile: './api/socket_connect.js.hbs',
      //   abortOnFail: true,
      // });
    }

    actions.push({
      type: 'prettify',
      path: '/api/',
    });

    return actions;
  },
};
