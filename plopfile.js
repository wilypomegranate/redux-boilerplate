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
          template: "import epics from './epics'"
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

        actions.push({
          type: 'append',
          path: 'src/containers/{{name}}/index.js',
          pattern: /compose\(/,
          template: 'reducers, epics,'
        })
      }

      if (data.reduxObservable) {
        actions.push({
          type: 'add',
          path: 'src/containers/{{name}}/epics.js',
          templateFile: 'plop_templates/containers/epics.hbs'
        })

        actions.push({
          type: 'append',
          path: 'src/epics.js',
          pattern: '// Import epics here.',
          template: "import {{name}}Epic from './containers/{{name}}/epics'"
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
  })

  plop.setGenerator('route', {
    description: 'This is a plop for a route.',
    prompts: [{
        type: 'input',
        name: 'path',
        message: 'Route url'
    }, {
      type: 'input',
      name: 'container',
      message: 'Container to route to.'
    }],
    actions: [{
      type: 'append',
      path: 'src/containers/App/routes.js',
      pattern: '<Router>',
      template: '    <Route path="{{path}}" component={ {{~container~}} } />'
    }, {
      type: 'append',
      path: 'src/containers/App/routes.js',
      pattern: '// Import containers here.',
      template: "import {{container}} from '../{{container}}/index'"
    }]
  })
};
