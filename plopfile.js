module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('container', {
    description: 'This is a plop for a container with redux components.',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'container name'
    }, {
      type: 'confirm',
      name: 'reduxComponents',
      message: 'Do you want to add redux components to this container? ' +
      'E.g., actions, reducers, selectors.'
    }, {
      type: 'confirm',
      name: 'reduxObservable',
      message: 'Do you want to add redux-observable to this container?'
    }], // array of inquirer prompts
    actions: function(data) {
      var actions = []

      actions.push({
        type: 'add',
        path: 'src/containers/{{name}}/index.js',
        templateFile: 'plop_templates/containers/index.hbs'
      })

      if (data.reduxComponents) {

        const reduxComponents = ['actions', 'reducers', 'selectors']

        reduxComponents.forEach(function(component) {

          actions.push({
            type: 'add',
            path: 'src/containers/{{name}}/' + component + '.js',
            templateFile: 'plop_templates/containers/redux/' + component + '.hbs'
          })

        })

        actions.push({
          type: 'append',
          path: 'src/containers/{{name}}/index.js',
          pattern: '// Imports of optional dependent components here.',
          template: "import reducers from './reducers'"
        })

        actions.push({
          type: 'append',
          path: 'src/reducers.js',
          pattern: '// Import reducers here.',
          template: "import {{name}}Reducer from './containers/{{name}}/reducers.js'"
        })

        actions.push({
          type: 'append',
          path: 'src/reducers.js',
          pattern: /export default combineReducers\(\[/,
          separator: '\n',
          template: '{{name}}Reducer,'
        })
      }

      if (data.reduxObservable) {
        actions.push({
          type: 'add',
          path: 'src/containers/{{name}}/epic.js',
          templateFile: 'plop_templates/containers/epic.hbs'
        })

        actions.push({
          type: 'append',
          path: 'src/epics.js',
          pattern: '// Import epics here.',
          template: "import {{name}}Epic from './containers/{{name}}/epic'"
        })

        actions.push({
          type: 'append',
          path: 'src/epics.js',
          pattern: /export default combineEpics\(/,
          template: '{{name}}Epic,'
        })
      }

      return actions
    }
  });
};
