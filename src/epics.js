import { combineEpics } from 'redux-observable'

// Import epics here.
import HomeEpic from './containers/Home/epic'


export default combineEpics(
HomeEpic,
)
