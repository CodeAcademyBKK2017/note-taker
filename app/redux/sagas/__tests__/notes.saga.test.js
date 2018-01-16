import ApiNotes from '../../../api';
import sagaHelper from 'redux-saga-testing';
import StorageUtil from '../../../utils/StorageUtil';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import * as actions from './../../../redux/actions/index.actions';
import * as notesSagas from '../notes.saga';

// test case
describe('notesSaga', () => {
  const it = sagaHelper(notesSagas.default());

  it('should take function fetchNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.FETCH_NOTES, notesSagas.fetchNoteHandler));
  });

  it('should take function saveNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.SAVE_NOTE, notesSagas.saveNoteHandler));
  });

  it('should take function deleteRequestNoteHandler', (result) => {
    expect(result).toEqual(takeLatest(actions.DELETE_REQUEST_NOTE, notesSagas.deleteRequestNoteHandler));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchNoteHandler', () => {
  const it = sagaHelper(notesSagas.fetchNoteHandler());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should put showLoader', (result) => {
    expect(result).toEqual(put(actions.showLoader()));
  });

  it('should call loadNotes', (result) => {
    expect(result).toEqual(call(notesSagas.loadNotes));
    return response;
  });

  it('should put populateNotes', (result) => {
    expect(result).toEqual(put(actions.populateNotes(response)));
  });

  it('should put hideLoader', (result) => {
    expect(result).toEqual(put(actions.hideLoader()));
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('loadNotes success', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual(response);
  });
});

describe('loadNotes failure with data', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  const response = [
    {
      id: 1,
      title: 'test title',
      content: 'test content'
    },
    {
      id: 2,
      title: 'test title',
      content: 'test content'
    }
  ];

  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('ApiNotes.getNotes Failure');
  });

  it('should call StorageUtil.getItem', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, notesSagas.notesKey));
    return response;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual(response);
  });
});

describe('loadNotes failure with empty', () => {
  const it = sagaHelper(notesSagas.loadNotes());
  
  it('should call ApiNotes.getNotes', (result) => {
    expect(result).toEqual(call(ApiNotes.getNotes));
    return new Error('ApiNotes.getNotes Failure');
  });

  it('should call StorageUtil.getItem', (result) => {
    expect(result).toEqual(call(StorageUtil.getItem, notesSagas.notesKey));
    return null;
  });

  it('and then nothing', (result) => {
    expect(result).toEqual([]);
  });
});
