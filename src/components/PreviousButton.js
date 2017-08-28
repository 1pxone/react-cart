import React from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as StepperActions from '../actions/StepperActions'

class PreviousButton extends React.Component {

  constructor(props) {
    super(props);
    this.onPreviousBtnClick = this.onPreviousBtnClick.bind(this);
  }
  onPreviousBtnClick(e) {
    this.props.PreviousStep(this.props.stepper.step - 1)
  }
  render() {
    return (

        <button className="btn btn-primary" onClick={this.onPreviousBtnClick}>Назад</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(PreviousButton);
