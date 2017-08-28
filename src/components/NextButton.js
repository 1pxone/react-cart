import React from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as StepperActions from '../actions/StepperActions'

class NextButton extends React.Component {
  constructor(props) {
    super(props);
    this.onNextBtnClick = this.onNextBtnClick.bind(this);
  }
  onNextBtnClick(e) {
    this.props.NextStep(this.props.stepper.step + 1)
  }
  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.onNextBtnClick}>Вперед</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    stepper: state.stepper
  }
}

function mapDispatchToProps(dispatch) {
  return {
    StepperActions: bindActionCreators(StepperActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
