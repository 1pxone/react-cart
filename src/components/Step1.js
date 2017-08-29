import React from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import update from 'immutability-helper';
import FastOrder from './FastOrder';


//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as CartActions from '../actions/CartActions'


class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart : []
    };
    this.decreaseQnty = this.decreaseQnty.bind(this);
    this.increaseQnty = this.increaseQnty.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sendpromocode = this.sendpromocode.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:3001/summary';
    axios.get(url)
      .then(res => {
        const cart = res.data.cart.map(obj => obj);
        this.setState({ cart });
      });
  }

  decreaseQnty(id){
    function findItem(item) {
        return item.id === id;
    };
    var itemindex = this.state.cart.findIndex(findItem);
    let newState = update(this.state, {
       "cart": {
          [itemindex ]: {
                   "count": { $set: this.state.cart[itemindex ].count - 1}
           }
        }
    });

    this.setState(newState);
    var url = 'http://localhost:3001/summary';
    axios.post(url, {cart: this.state.cart})
    .then(function (response) {

    })
    .catch(function (error) {

    });
  }

  increaseQnty(id){
    function findItem(item) {
        return item.id === id;
    };
    var itemindex = this.state.cart.findIndex(findItem);
    let newState = update(this.state, {
       "cart": {
          [itemindex ]: {
                   "count": { $set: ++this.state.cart[itemindex ].count }
           }
        }
    });
    this.setState(newState);
    var url = 'http://localhost:3001/summary';
    axios.post(url, {cart: this.state.cart})
    .then(function (response) {

    })
    .catch(function (error) {

    });
  }

  deleteItem(id){
    function findItem(item) {
        return item.id === id;
    }
    var itemindex = this.state.cart.findIndex(findItem);
    var curretState = this.state.cart;
    curretState.splice(itemindex, 1);
    this.setState({cart: curretState });
  }

  sendpromocode(){

  }

  render() {
    const products = this.state.cart.map(cartitem => (
      <tr key={cartitem.id}>
        <th><img src={cartitem.image} className="img-fluid rounded" width="40px" alt=""/></th>
        <td><p className="my-0">{cartitem.title}</p> <p className="my-0 py-0"><small>{cartitem.sku}</small></p>
        </td>
        <td>{cartitem.price}</td>
        <td>
          <div className="input-group">
            <span className="input-group-btn"><button type="button" className="btn btn-info" disabled={cartitem.count < 2 ? 'disabled' : null} onClick={() => this.decreaseQnty(cartitem.id)}><i className="fa fa-minus" aria-hidden="true"></i></button></span>
            <input type="text" className="form-control" value={cartitem.count} min="1" max="1000" />
            <span className="input-group-btn"><button type="button" className="btn btn-info"  onClick={() => this.increaseQnty(cartitem.id)}><i className="fa fa-plus" aria-hidden="true"></i></button></span>
          </div>
        </td>
        <td><CountUp start={cartitem.price * cartitem.count - cartitem.price} end={cartitem.price * cartitem.count} duration={0.2} /></td>
        <td><button type="button" className="btn btn-danger" onClick={() => this.deleteItem(cartitem.id)}><i className="fa fa-times" aria-hidden="true"></i></button></td>
      </tr>
    ));

    const subtotal = this.state.cart.reduce( function(cnt,o){ return cnt + o.price * o.count; }, 0);
    const productcount = this.state.cart.reduce( function(cnt,o){ return cnt + o.count; }, 0);


    var fastorder;
    if (this.props.isAuth) {
      fastorder = <FastOrder />;
    } else {
      fastorder = "";
    }

    return (
      <div  className="container py-5">
        <h1>{this.props.heading}</h1>
        <div className="row">
          <div className="col-9">
            <table className="table table-striped table-responsive">
              <tbody>
                {products}
              </tbody>
            </table>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header bg-light">Ваш заказ</div>
              <div className="card-body">
                <h4 className="card-title">Вы молодец!</h4>
                <h6 className="card-subtitle mb-2 text-muted">(но это не точно)</h6>
                <p className="card-text">В Вашей корзине <strong>{productcount}</strong> товаров на сумму <strong>{subtotal}</strong> рублей</p>
              </div>
            </div>
            <div className="input-group pt-3">
              <input type="text" className="form-control" placeholder="Промокод" />
              <span className="input-group-btn">
                <button className="btn btn-success" type="button"><i className="fa fa-check" aria-hidden="true"></i></button>
              </span>
            </div>
          </div>
        </div>

           {fastorder}

      </div>
    );
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
    CartActions: bindActionCreators(CartActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Step1);
