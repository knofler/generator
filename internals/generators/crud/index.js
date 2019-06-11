/**
 * API Generator
 */

// const componentExists = require("../utils/componentExists");

module.exports = {
  description: 'Generate CRUD for App ',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select CRUD Options :',
      default: 'CRUD API',
      choices: () => [
        'CRUD API',
        'CRUD for Application',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the model name?',
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
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var crudTemplate; // eslint-disable-line no-var

    switch (data.type) {
      default: {
        crudTemplate = './container/class.js.hbs';
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
        path: '../../server/api/{{properCase name}}/{{name}}.model.js',
        templateFile: './crud/model.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantRoutes) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/{{name}}.routes.js',
        templateFile: './crud/routes.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantController) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/{{name}}.controllers.js',
        templateFile: './crud/controller.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantDummyData) {
      actions.push({
        type: 'add',
        path: '../../server/api/{{properCase name}}/{{name}}.dummyData.js',
        templateFile: './crud/dummyData.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/api/',
    });

    return actions;
  },
};
