import React from 'react';
import axios from 'axios';





class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1
    };

  }

  componentDidMount() {

  }

  render() {


    switch(this.props.step * 1) {
      case 1:
        return (
          <div className="row text-center pt-3">
            <div className="col">
              <span className="circle bg-primary">1</span>
              <span className="">Корзина</span>
            </div>
            <div className="col">
              <span className="circle">2</span>
              <span className="">Выбор адреса</span>
            </div>
            <div className="col">
              <span className="circle">3</span>
              <span className="">Выбор оплаты</span>
            </div>
            <div className="col">
              <span className="circle">4</span>
              <span className="">Подтверждение</span>
            </div>
          </div>
        )
        // break;
      case 2:
        return (
          <div className="row text-center pt-3">
            <div className="col">
              <span className="circle bg-success bf-faded"><i className="fa fa-check" aria-hidden="true"></i></span>
              <span className="">Корзина</span>
            </div>
            <div className="col">
              <span className="circle bg-primary">2</span>
              <span className="">Выбор адреса</span>
            </div>
            <div className="col">
              <span className="circle">3</span>
              <span className="">Выбор оплаты</span>
            </div>
            <div className="col">
              <span className="circle">4</span>
              <span className="">Подтверждение</span>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="row text-center pt-3">
            <div className="col">
              <span className="circle bg-success"><i className="fa fa-check" aria-hidden="true"></i></span>
              <span className="">Корзина</span>
            </div>
            <div className="col">
              <span className="circle bg-success"><i className="fa fa-check" aria-hidden="true"></i></span>
              <span className="">Выбор адреса</span>
            </div>
            <div className="col">
              <span className="circle bg-primary">3</span>
              <span className="">Выбор оплаты</span>
            </div>
            <div className="col">
              <span className="circle">4</span>
              <span className="">Подтверждение</span>
            </div>
          </div>
        )
        case 4:
          return (
            <div className="row text-center pt-3">
              <div className="col">
                <span className="circle bg-success"><i className="fa fa-check" aria-hidden="true"></i></span>
                <span className="">Корзина</span>
              </div>
              <div className="col">
                <span className="circle bg-success"><i className="fa fa-check" aria-hidden="true"></i></span>
                <span className="">Выбор адреса</span>
              </div>
              <div className="col">
                <span className="circle bg-success"><i className="fa fa-check" aria-hidden="true"></i></span>
                <span className="">Выбор оплаты</span>
              </div>
              <div className="col">
                <span className="circle bg-primary">4</span>
                <span className="">Подтверждение</span>
              </div>
            </div>
          )
        // break;
      default:
        break;
    }

  }
}



export default Stepper;
