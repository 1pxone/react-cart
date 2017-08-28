import React from 'react';
import './App.css';
import axios from 'axios';
import update from 'immutability-helper';

// step components
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Stepper from '../components/Stepper';
import Navbar from '../components/Navbar';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as StepperActions from '../actions/StepperActions'

import  NextButton  from '../components/NextButton'
import  PreviousButton  from '../components/PreviousButton'


class Cart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      user:{
        isAuth: false,
        uid: 123,
        name:"Иван Кулек",
        addresses:[
          {
            "id": 1,
            "isActive": true,
            "title": "Дом",
            "country": "Россия",
            "city": "Москва",
            "address": "ул. Пушкина, д. 777, кв. 111",
            "postcode": 123322,
            "additionalInfo": "домофон сломан, кричите, что есть сил"
          },
          {
            "id": 2,
            "isActive": false,
            "title": "Работа",
            "country": "Россия",
            "city": "Москва",
            "address": "ул. Пушкина, д. 777, кв. 111",
            "postcode": 123322,
            "additionalInfo": "домофон сломан, кричите, что есть сил"
          }
        ]
      },
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:1
      },
      summary:{}
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  };

  login(){
    this.setState({
      cart: this.state.cart,
      user: {
        isAuth: true,
        uid: this.state.user.uid,
        name:this.state.user.name,
        addresses:this.state.user.addresses
      },
      step: this.state.step,
    });
  }

  logout(){
    this.setState({
      cart: this.state.cart,
      user: {
        isAuth: false,
        uid: this.state.user.uid,
        name:this.state.user.name,
        addresses:this.state.user.addresses
      },
      step: this.state.step,
    });
  }

  componentDidMount() {
    var url = 'http://localhost:3001/summary';
    axios.get(url)
      .then(res => {
        let newState = update(this.state, {"summary": { $set: res.data}})
        this.setState(newState);
      })
  }

  render() {
    //for debug
    var debugstyle = {
      color: 'lime',
      background: 'black'
    };
    const currentsummary = (<div className="my-5 p-2 text-white" style={debugstyle}><pre style={debugstyle}> {JSON.stringify(this.state.summary, null, 2) }</pre></div>)
    //end debug block

    //redux
    const { NextStep } = this.props.StepperActions;
    const { PreviousStep } = this.props.StepperActions;

    switch(this.props.stepper.step) {
      case 1:
        return (
          <div className="container">
            <Navbar isAuth={this.state.user.isAuth} />
            <Stepper step={this.props.stepper.step}  />
            <Step1 heading="Ваш заказ"/>
            <NextButton NextStep={NextStep}/>
            <button className="btn btn-primary">Быстрый заказ</button>
            {currentsummary}
          </div>
        )

      case 2:
        switch(this.state.user.isAuth) {
          case true:
            return (
              <div className="container">
                <Navbar isAuth={this.state.user.isAuth} />
                <Stepper step="2"/>
                <Step3 heading="Выбор доставки"/>
                <button onClick={this.logout} className="btn btn-primary">
                  Выйти
                </button>
                <NextButton NextStep={NextStep} className="py-5"/>
                <PreviousButton PreviousStep={PreviousStep}/>
                {currentsummary}
              </div>
            )

          case false:
            return (
              <div className="container">
                <Navbar isAuth={this.state.user.isAuth} />
                <Stepper step="2"/>
                <Step2 heading="Войти / Зарегистрироваться"/>
                <div className="row">
                <button onClick={this.login} className="btn btn-primary">
                  Войти
                </button>
                </div>
                <NextButton NextStep={NextStep}/>
                <PreviousButton PreviousStep={PreviousStep}/>
                {currentsummary}
              </div>
            )

          default:
            break;
        }

        break;
      case 3:
        return (
          <div className="container">
            <Navbar isAuth={this.state.user.isAuth} />
            <Stepper step="3"/>
            <Step4 heading="Выбор оплаты"/>
            <NextButton NextStep={NextStep}/>
            <PreviousButton PreviousStep={PreviousStep}/>
            {currentsummary}
          </div>
        )
      case 4:
        return (
          <div className="container">
            <Navbar isAuth={this.state.user.isAuth} />
            <Stepper step="4"/>
            <Step4 heading="Подтверждение заказа"/>
            <PreviousButton PreviousStep={PreviousStep}/>
            {currentsummary}
          </div>
        )

      default:
        break;
    }
  }
}

function mapStateToProps (state) {
  return {
    stepper: state.stepper,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    StepperActions: bindActionCreators(StepperActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
