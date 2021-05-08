import * as actions from '../_actions/types';

export default function (state = { messages: [] }, action) {
  switch (action.type) {
    case actions.SAVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
}
