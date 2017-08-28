const initialState = {
  step: 2
}

export default function stepperstate(state = initialState, action) {

  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: action.payload }
    case 'PREVIOUS_STEP':
      return { ...state, step: action.payload }

    default:
      return state;
  }

}
