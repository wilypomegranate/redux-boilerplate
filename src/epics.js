import { combineEpics } from 'redux-observable'

// Import epics here.
import HomeEpic from './containers/Home/epics'


export default combineEpics(
HomeEpic,

)
