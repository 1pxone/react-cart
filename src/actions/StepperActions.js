export function NextStep(step) {

  return {
    type: 'NEXT_STEP',
    payload: step
  }

}
export function PreviousStep(step) {

  return {
    type: 'PREVIOUS_STEP',
    payload: step
  }

}
