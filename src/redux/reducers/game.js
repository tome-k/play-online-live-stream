import {
  ADD_APPLE_SPIN,
  ADD_SPIN_COINS_SCORE, ADD_GET_SPIN_LIST, ADD_LOCK_SPIN,
  ADD_MEGA_SPIN,
  ADD_NIKE_SPIN,
  ADD_SPIN, REMOVE_SPIN_LIST, RESET_ANIMATION,
  SET_TOKEN_FLARE_SCORE,
  SET_TOKEN_MEGA_SCORE,
  ADD_WAVE_SCORE,
  ADD_PASS_SCORE, REDUCE_MEGA_SPIN,
  ADD_ALL_BULLET_FLARE
} from "../action/type";
import concat from 'lodash/concat';

const initialState = {
  score: {
    waveScore: 0,
    spinCoins: 0,
    playerPassScore: 0,
    megaSpin: 0,
    nikeSpin: 0,
    lockSpin: 0,
    appleSpin: 0
  },
  spinToken: {
    flareSpin: 0,
    megaSpin: 0
  },
  bulletFlare: 100,
  getSpinListItems: [],
  leftSpinUpdate: 0
};

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPIN_COINS_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          spinCoins: state.score.spinCoins + parseInt(action.payload)
        }
      };
    case ADD_WAVE_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          waveScore: state.score.waveScore + parseInt(action.payload),
          playerPassScore: Math.floor((state.score.waveScore + parseInt(action.payload)) / 500)
        }
      };
    case ADD_PASS_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          playerPassScore: state.score.playerPassScore + parseInt(action.payload)
        }
      };
    case SET_TOKEN_FLARE_SCORE:
      return {
        ...state,
        spinToken: {
          ...state.spinToken,
          flareSpin: action.payload
        }
      };
    case SET_TOKEN_MEGA_SCORE:
      return {
        ...state,
        spinToken: {
          ...state.spinToken,
          megaSpin: action.payload
        }
      };
    case ADD_SPIN:
      switch (action.payload.spinType) {
        case ADD_MEGA_SPIN:
          return {
            ...state,
            score: {
              ...state.score,
              megaSpin: state.score.megaSpin + action.payload.score
            }
          };
        case ADD_NIKE_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              nikeSpin: state.score.nikeSpin + action.payload.score
            }
          };
        case ADD_APPLE_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              appleSpin: state.score.appleSpin + action.payload.score
            }
          };
        case ADD_LOCK_SPIN :
          return {
            ...state,
            score: {
              ...state.score,
              lockSpin: state.score.lockSpin + action.payload.score
            }
          };
        case REDUCE_MEGA_SPIN:
          return {
            ...state,
            score: {
              ...state.score,
              megaSpin: state.score.megaSpin - action.payload.score
            }
          };
        default :
          return state;
      }
    case ADD_GET_SPIN_LIST:
      if (state.getSpinListItems.filter(item => item.megaType === action.payload.megaType).length > 0) {
        return {
          ...state,
          leftSpinUpdate: state.getSpinListItems.findIndex(item => item.megaType === action.payload.megaType)
        };
      }
      else {
        const addedItem = concat(...state.getSpinListItems, action.payload);
        return {
          ...state,
          getSpinListItems: addedItem,
          leftSpinUpdate: state.getSpinListItems.length
        };
      }
    case REMOVE_SPIN_LIST:
      return {
        ...state,
        getSpinListItems: state.getSpinListItems.filter(item => item.megaType !== action.payload)
      };
    case RESET_ANIMATION :
      return {
        ...state,
        leftSpinUpdate: -1
      };
    case ADD_ALL_BULLET_FLARE:
      return {
        ...state,
        bulletFlare: state.bulletFlare+action.payload
      };
    default :
      return state;
  }
};
export default GameReducer;
