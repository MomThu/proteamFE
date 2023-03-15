import { all, call } from 'redux-saga/effects';

function* DefaultSaga() {
  //
}

export default function* rootSagas() {
  yield all([call(DefaultSaga)]);
}
