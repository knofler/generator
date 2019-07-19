/**
 * FullStack Generator
 */

const path = require('path');

// change env to 'dev' for local testing
const env = 'prod';

let app = '',
    api = '';


if (env == 'prod') {
  app = path.join('../../../', 'app', '/app/', 'containers');
  api = path.join('../../../', 'api', '/server/', 'api')
} else if (env == 'dev') {
  app = path.join('../../', '/GENAPP/', 'app', 'containers');
  api = path.join('../../', '/GENAPP/', '/server/', 'api')
}


const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Create a FullStack App ",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select Deployment Options :",
      default: true,
      choices: () => [
        "Stateless Function",
        "React.PureComponent",
        "React.Component",
      ]
    },
    {
      type: "confirm",
      name: "wantRead",
      message: "Do you need Read component?",
      default: true,
    },
     {
       type: "confirm",
       name: "wantCRUD",
       default: true,
       message: "Do you want CRUD Functionality on your page?",
     },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "read",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }
        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantCreate",
      message: "Do you need Create component?",
      default: true,
    },
    {
      type: "confirm",
      name: "wantUpdate",
      message: "Do you need Update component?",
      default: true,
    },
    {
      type: "confirm",
      name: "wantDelete",
      message: "Do you need Delete component?",
      default: true,
    },
    {
      type: "input",
      name: "model",
      message: "What data model it will connect?",
      default: "orders"
    },
    {
      type: "confirm",
      name: "wantHeaders",
      default: false,
      message: "Do you want headers?"
    },
    {
      type: "confirm",
      name: "wantActionsAndReducer",
      default: true,
      message:
        "Do you want an actions/constants/selectors/reducer tuple for this container?"
    },
    {
      type: "confirm",
      name: "wantSaga",
      default: true,
      message: "Do you want sagas for asynchronous flows? (e.g. fetching data)"
    },
    {
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want i18n messages (i.e. will this component use text)?"
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: true,
      message: "Do you want to load resources asynchronously?"
    },
    {
      type: "confirm",
      name: "wantSocket",
      default: false,
      message: "Do you want Socket Client connection?"
    },
    {
      type: "confirm",
      name: "wantCSS",
      default: true,
      message: "Do you want Default CSS?",
    },
    {
      type: "confirm",
      name: "wantApi",
      default: true,
      message: "Do you want API for this app?"
    },
    {
      type: "confirm",
      name: "wantModel",
      default: true,
      message: "Do you want to start with a model for your Data schema?"
    },
    {
      type: "confirm",
      name: "wantRoutes",
      default: true,
      message: "Do you want Routes?"
    },
    {
      type: "confirm",
      name: "wantController",
      default: true,
      message:
        "Do you want a controller for this model?"
    },
    {
      type: "confirm",
      name: "wantAws",
      default: true,
      message: "Do you want AWS Connectior API for this app?"
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
     }, {
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
     }, {
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
     }, {
       type: 'confirm',
       name: 'wantParams',
       default: true,
       message: 'Do you want to start with a parameter list for your aws controller?',
     }, {
       type: 'confirm',
       name: 'wantRoutes',
       default: true,
       message: 'Do you want Routes?',
     }, {
       type: 'confirm',
       name: 'wantController',
       default: true,
       message: 'Do you want a controller for this model?',
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
     {
       type: "confirm",
       name: "wantSearch",
       default: true,
       message: "Do you want Search for this container?"
     }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate,apiTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./container/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./container/class.js.hbs";
      }
    }

    const actions = [
      // {
      //   type: "add",
      //   path: `${app}/{{properCase name}}/index.js`,
      //   templateFile: componentTemplate,
      //   abortOnFail: true
      // },
      {
        type: "add",
        path: `${app}/{{properCase name}}/tests/index.test.js`,
        templateFile: "./container/test.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: `${api}/{{properCase name}}/tests/index.test.js`,
        templateFile: "./api/test.js.hbs",
        abortOnFail: true
      }
    ];

    // If Read is wanted
    if (data.wantRead) {

        actions.push({
          type: "add",
          path: `${app}/{{properCase name}}/index.js`,
          templateFile: "./read/class.js.hbs",
          abortOnFail: true
        });

        // If component wants messages
        if (data.wantMessages) {
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/messages.js`,
            templateFile: "./read/messages.js.hbs",
            abortOnFail: true
          });
        }

        // If they want actions and a reducer, generate actions.js, constants.js,
        // reducer.js and the corresponding tests for actions and the reducer
        if (data.wantActionsAndReducer) {
          // Actions
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/actions.js`,
            templateFile: "./read/actions.js.hbs",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/tests/actions.test.js`,
            templateFile: "./read/actions.test.js.hbs",
            abortOnFail: true
          });

          // Constants
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/constants.js`,
            templateFile: "./read/constants.js.hbs",
            abortOnFail: true
          });

          // Selectors
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/selectors.js`,
            templateFile: "./read/selectors.js.hbs",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/tests/selectors.test.js`,
            templateFile: "./read/selectors.test.js.hbs",
            abortOnFail: true
          });

          // Reducer
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/reducer.js`,
            templateFile: "./read/reducer.js.hbs",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/tests/reducer.test.js`,
            templateFile: "./read/reducer.test.js.hbs",
            abortOnFail: true
          });
        }

        // Sagas
        if (data.wantSaga) {
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/saga.js`,
            templateFile: "./read/saga.js.hbs",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/tests/saga.test.js`,
            templateFile: "./read/saga.test.js.hbs",
            abortOnFail: true
          });
        }
      
        // Dummy Data
        if (data.wantDummyData) {
          actions.push({
            type: "add",
            path: `${app}/{{properCase name}}/mocks/dummyData.js`,
            templateFile: "./read/mocks/dummyData.js.hbs",
            abortOnFail: true,
          });
        }

      // Loadable
      if (data.wantLoadable) {
        actions.push({
          type: "add",
          path: `${app}/{{properCase name}}/Loadable.js`,
          templateFile: "./component/loadable.js.hbs",
          abortOnFail: true
        });
      }
      
      // If wants CSS
      if (data.wantCSS) {
        actions.push({
          type: "add",
          path: `${app}/{{properCase name}}/{{properCase name}}.css`,
          templateFile: "./read/read.css.hbs",
          abortOnFail: true,
        });
      }

    }

    // If Create is wanted
    if (data.wantCreate) {

      actions.push({
        type: "add",
        path: `${app}/Create/index.js`,
        templateFile: "./fullStack/Create/index.js",
        abortOnFail: true
      });

      // If component wants messages
      if (data.wantMessages) {
        actions.push({
          type: "add",
          path: `${app}/Create/messages.js`,
          templateFile: "./fullStack/Create/messages.js",
          abortOnFail: true
        });
      }

      // If they want actions and a reducer, generate actions.js, constants.js,
      // reducer.js and the corresponding tests for actions and the reducer
      if (data.wantActionsAndReducer) {
        // Actions
        actions.push({
          type: "add",
          path: `${app}/Create/actions.js`,
          templateFile: "./fullStack/Create/actions.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Create/tests/actions.test.js`,
          templateFile: "./fullStack/Create/tests/actions.test.js",
          abortOnFail: true
        });

        // Constants
        actions.push({
          type: "add",
          path: `${app}/Create/constants.js`,
          templateFile: "./fullStack/Create/constants.js",
          abortOnFail: true
        });

        // Selectors
        actions.push({
          type: "add",
          path: `${app}/Create/selectors.js`,
          templateFile: "./fullStack/Create/selectors.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Create/tests/selectors.test.js`,
          templateFile: "./fullStack/Create/tests/selectors.test.js",
          abortOnFail: true
        });

        // Reducer
        actions.push({
          type: "add",
          path: `${app}/Create/reducer.js`,
          templateFile: "./fullStack/Create/reducer.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Create/tests/reducer.test.js`,
          templateFile: "./fullStack/Create/tests/reducer.test.js",
          abortOnFail: true
        });
      }

      // Sagas
      if (data.wantSaga) {
        actions.push({
          type: "add",
          path: `${app}/Create/saga.js`,
          templateFile: "./fullStack/Create/saga.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Create/tests/saga.test.js`,
          templateFile: "./fullStack/Create/tests/saga.test.js",
          abortOnFail: true
        });
      }

      // Loadable
      if (data.wantLoadable) {
        actions.push({
          type: "add",
          path: `${app}/Create/Loadable.js`,
          templateFile: "./component/loadable.js.hbs",
          abortOnFail: true
        });
      }

      // If wants CSS
      if (data.wantCSS) {
        actions.push({
          type: "add",
          path: `${app}/Create/Create.css`,
          templateFile: "./fullStack/Create/create.css",
          abortOnFail: true
        });
      }

     

    }
    
    // If Update is wanted
    if (data.wantUpdate) {

      actions.push({
        type: "add",
        path: `${app}/Update/index.js`,
        templateFile: "./fullStack/Update/index.js",
        abortOnFail: true
      });

      // If component wants messages
      if (data.wantMessages) {
        actions.push({
          type: "add",
          path: `${app}/Update/messages.js`,
          templateFile: "./fullStack/Update/messages.js",
          abortOnFail: true
        });
      }

      // If they want actions and a reducer, generate actions.js, constants.js,
      // reducer.js and the corresponding tests for actions and the reducer
      if (data.wantActionsAndReducer) {
        // Actions
        actions.push({
          type: "add",
          path: `${app}/Update/actions.js`,
          templateFile: "./fullStack/Update/actions.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Update/tests/actions.test.js`,
          templateFile: "./fullStack/Update/tests/actions.test.js",
          abortOnFail: true
        });

        // Constants
        actions.push({
          type: "add",
          path: `${app}/Update/constants.js`,
          templateFile: "./fullStack/Update/constants.js",
          abortOnFail: true
        });

        // Selectors
        actions.push({
          type: "add",
          path: `${app}/Update/selectors.js`,
          templateFile: "./fullStack/Update/selectors.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Update/tests/selectors.test.js`,
          templateFile: "./fullStack/Update/tests/selectors.test.js",
          abortOnFail: true
        });

        // Reducer
        actions.push({
          type: "add",
          path: `${app}/Update/reducer.js`,
          templateFile: "./fullStack/Update/reducer.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Update/tests/reducer.test.js`,
          templateFile: "./fullStack/Update/tests/reducer.test.js",
          abortOnFail: true
        });
      }

      // Sagas
      if (data.wantSaga) {
        actions.push({
          type: "add",
          path: `${app}/Update/saga.js`,
          templateFile: "./fullStack/Update/saga.js",
          abortOnFail: true
        });
        actions.push({
          type: "add",
          path: `${app}/Update/tests/saga.test.js`,
          templateFile: "./fullStack/Update/tests/saga.test.js",
          abortOnFail: true
        });
      }

       // Loadable
       if (data.wantLoadable) {
         actions.push({
           type: "add",
           path: `${app}/Update/Loadable.js`,
           templateFile: "./component/loadable.js.hbs",
           abortOnFail: true
         });
       }

       // If wants CSS
       if (data.wantCSS) {
         actions.push({
           type: "add",
           path: `${app}/Update/Update.css`,
           templateFile: "./fullStack/Update/update.css",
           abortOnFail: true
         });
       }
      
    }

      // If Update is wanted
    if (data.wantDelete) {

        actions.push({
          type: "add",
          path: `${app}/Delete/index.js`,
          templateFile: "./fullStack/Delete/index.js",
          abortOnFail: true
        });

        // If component wants messages
        if (data.wantMessages) {
          actions.push({
            type: "add",
            path: `${app}/Delete/messages.js`,
            templateFile: "./fullStack/Delete/messages.js",
            abortOnFail: true
          });
        }

        // If they want actions and a reducer, generate actions.js, constants.js,
        // reducer.js and the corresponding tests for actions and the reducer
        if (data.wantActionsAndReducer) {
          // Actions
          actions.push({
            type: "add",
            path: `${app}/Delete/actions.js`,
            templateFile: "./fullStack/Delete/actions.js",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/Delete/tests/actions.test.js`,
            templateFile: "./fullStack/Delete/tests/actions.test.js",
            abortOnFail: true
          });

          // Constants
          actions.push({
            type: "add",
            path: `${app}/Delete/constants.js`,
            templateFile: "./fullStack/Delete/constants.js",
            abortOnFail: true
          });

          // Selectors
          actions.push({
            type: "add",
            path: `${app}/Delete/selectors.js`,
            templateFile: "./fullStack/Delete/selectors.js",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/Delete/tests/selectors.test.js`,
            templateFile: "./fullStack/Delete/tests/selectors.test.js",
            abortOnFail: true
          });

          // Reducer
          actions.push({
            type: "add",
            path: `${app}/Delete/reducer.js`,
            templateFile: "./fullStack/Delete/reducer.js",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/Delete/tests/reducer.test.js`,
            templateFile: "./fullStack/Delete/tests/reducer.test.js",
            abortOnFail: true
          });
        }

        // Sagas
        if (data.wantSaga) {
          actions.push({
            type: "add",
            path: `${app}/Delete/saga.js`,
            templateFile: "./fullStack/Delete/saga.js",
            abortOnFail: true
          });
          actions.push({
            type: "add",
            path: `${app}/Delete/tests/saga.test.js`,
            templateFile: "./fullStack/Delete/tests/saga.test.js",
            abortOnFail: true
          });
        }

        // Loadable
        if (data.wantLoadable) {
          actions.push({
            type: "add",
            path: `${app}/Delete/Loadable.js`,
            templateFile: "./component/loadable.js.hbs",
            abortOnFail: true
          });
        }

        // If wants CSS
        if (data.wantCSS) {
          actions.push({
            type: "add",
            path: `${app}/Delete/Delete.css`,
            templateFile: "./fullStack/Delete/Delete.css",
            abortOnFail: true
          });
        }

      }
            
    // If API is wanted
    if (data.wantApi) {

      if (data.wantModel) {
        actions.push({
          type: "add",
          path: `${api}/{{properCase name}}/model.js`,
          templateFile: "./api/model.js.hbs",
          abortOnFail: true
        });
      }

      if (data.wantRoutes) {
        actions.push({
          type: "add",
          path: `${api}/{{properCase name}}/routes.js`,
          templateFile: "./api/routes.js.hbs",
          abortOnFail: true
        });
      }

      if (data.wantController) {
        actions.push({
          type: "add",
          path: `${api}/{{properCase name}}/controller.js`,
          templateFile: "./api/controller.js.hbs",
          abortOnFail: true
        });
      }

      if (data.wantDummyData) {
        actions.push({
          type: "add",
          path: `${api}/{{properCase name}}/dummyData.js`,
          templateFile: "./api/dummyData.js.hbs",
          abortOnFail: true
        });
      }

    }
    
    // If AWS API is wanted
    if (data.wantApi) {
        if (data.wantParams) {
          actions.push({
            type: 'add',
            path: `${api}/aws/{{properCase name}}/params/params.{{ name }}.js`,
            templateFile: './aws/params/params.js.hbs',
            abortOnFail: true,
          });
        }

        if (data.wantRoutes) {
          actions.push({
            type: 'add',
            path: `${api}/aws/{{properCase name}}/routes.js`,
            templateFile: './aws/routes.js.hbs',
            abortOnFail: true,
          });
        }

        if (data.wantController) {
          actions.push({
            type: 'add',
            path: `${api}/aws/{{properCase name}}/controller.js`,
            templateFile: './aws/controller.js.hbs',
            abortOnFail: true,
          });
        }
    }

    actions.push({
      type: "prettify",
      path: "/api/"
    });

    return actions;
  }
};