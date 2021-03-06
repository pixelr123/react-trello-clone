import * as t from '../../constants';

export const initialState = {
  currentBoardID: null,
  isLoading: false,
  isSidebarOpened: false,
  colors: ['#2E7EAF', '#00603d', '#D29034', '#89609D', '#CD5A91'],
  labels: [
    { _labelId: 0, color: '#61BC4F' },
    { _labelId: 1, color: '#F2D600' },
    { _labelId: 2, color: '#FF9F1A' },
    { _labelId: 3, color: '#EB5A46' },
    { _labelId: 4, color: '#C376E0' },
    { _labelId: 5, color: '#0078BF' }
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_BOARDS:
      return {
        ...state,
        isLoading: true,
      };
    case t.RESPONSE_BOARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case t.SET_CURRENT_BOARD_ID:
      return {
        ...state,
        currentBoardID: action.payload
      };
    case t.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: action.payload !== undefined
          ? action.payload
          : !state.isSidebarOpened,
      };
    default:
      return state;
  }
};

export default rootReducer;
