import React from 'react';
import axios from 'axios';





class Step4 extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {

  }

  render() {
    return (
      <div  className="container">
        <div className="row">
          <h1>{this.props.heading}</h1>
        </div>
        <div className="row">
          <p>Выберите удобный для Вас способ оплаты</p>
        </div>
        <div className="row">

        </div>
      </div>
    );
  }
}



export default Step4;
