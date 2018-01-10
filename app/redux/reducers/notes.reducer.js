import transformerutil from '../../utility/transformer.util';

const notes = (previousState = [], action) => {
  switch (action.type) {
  case 'ADD_NOTE': {
    return [...previousState, action.payload];
  }
  case 'DELETE_NOTE': {
    return transformerutil.deleteItem(previousState, action.payload);
  }
  case 'POPULATE_NOTE': {
    return action.payload;
  }
  default:
    return previousState;
  }
};

export default notes;
