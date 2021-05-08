import * as actions from './types';

export function saveMessage(dataToSubmit) {
  return {
    type: actions.SAVE_MESSAGE,
    payload: dataToSubmit,
  };
}
