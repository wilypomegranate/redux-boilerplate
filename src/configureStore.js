import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import reducer from './reducers'
import epic from './epics'

const epicMiddleware = createEpicMiddleware(epic)

const store = createStore(reducer, applyMiddleware(epicMiddleware))

export default store
