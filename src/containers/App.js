import React from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import update from 'immutability-helper';
// import Form from "react-jsonschema-form";

// step components
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Stepper from '../components/Stepper';


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
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toPayment = this.toPayment.bind(this);
  };


  previous(count){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:this.state.step.stepnum - 1
      }
    });
  }

  next(count){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Выбор доставки",
        stepnum: this.state.step.stepnum + 1
      }
    });
  }
  toPayment(){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step4",
        title: "Выбор оплаты",
        stepnum:3
      }
    });
  }


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
        console.log(res.data)
        // const summary = res.data.map(obj => obj);
        // console.log(summary)
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
    const currentsummary = (<div className="my-5 p-2 text-white" style={debugstyle}><pre style={debugstyle}>{JSON.stringify(this.state.summary, null, 2) }</pre></div>)
    //end debug block

    const navbar = (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a className="navbar-brand" href="#">Hidden brand</a>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>);


    switch(this.state.step.stepnum) {
      case 1:
        return (
          <div className="container">
          {navbar}
            <Stepper step="1"/>
            <Step1 heading="Ваш заказ"/>
            <button onClick={this.next} className="btn btn-primary">
              Выбор доставки
            </button>
            {currentsummary}
          </div>
        )
        // break;
      case 2:
        switch(this.state.user.isAuth) {
          case true:
            return (
              <div className="container">
              {navbar}
                <Stepper step="2"/>
                <Step3 heading="Выбор доставки"/>
                <button onClick={this.logout} className="btn btn-primary">
                  Выйти
                </button>
                <button onClick={this.previous} className="btn btn-primary">
                  Назад
                </button>
                <button onClick={this.next} className="btn btn-primary">
                  Выбор оплаты
                </button>
                {currentsummary}
              </div>
            )
            // break;
          case false:
            return (
              <div className="container">
              {navbar}
                <Stepper step="2"/>
                <Step2 heading="Войти / Зарегистрироваться"/>
                <div className="row">
                <button onClick={this.login} className="btn btn-primary">
                  Войти
                </button>
                <button onClick={this.previous} className="btn btn-primary">
                  Назад
                </button>
                </div>
                {currentsummary}
              </div>
            )

            // break;
          default:
            break;
        }

        break;
      case 3:
        return (
          <div className="container">
          {navbar}
            <Stepper step="3"/>
            <Step4 heading="Выбор оплаты"/>
            <button onClick={this.previous} className="btn btn-primary">
              Назад
            </button>
            {currentsummary}
          </div>
        )
        // break;
      default:
        break;
    }
  }
}



export default Cart;
