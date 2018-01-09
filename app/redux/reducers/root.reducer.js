// import test from './test.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  init: () => ({}),
  notes: (previousState = [], action) => {
    switch (action.type) {
    case 'ADD_NOTE': {
      return [...previousState, {...action.payload}];
    }
    case 'DELETE_NOTE': {
      const dataNote = [...previousState];
      const filteredNotes = dataNote.filter((note) => note.id !== action.payload.id);
      return filteredNotes;
    }
    case 'GET_NOTE': {
      return [...action.payload];
    }
    default:
      return previousState;
    }
  }
});