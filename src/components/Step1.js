import React from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart : []
    };
    this.decreaseQnty = this.decreaseQnty.bind(this);
    this.increaseQnty = this.increaseQnty.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    // var that = this;
    var url = 'http://localhost:3001/cart';

    axios.get(url)
      .then(res => {
        const cart = res.data.map(obj => obj.data);
        this.setState({ cart });
        // console.log({cart})
      });
  }

  decreaseQnty(id){
    function findItem(item) {
        return item.id === id;
    }
    var itemindex = this.state.cart.findIndex(findItem);

    // console.log(itemindex);
    // console.log(this.state.cart[itemindex].count + 1);
    this.state.cart[itemindex].count = this.state.cart[itemindex].count - 1;
    this.forceUpdate();
  }

  increaseQnty(id){
    function findItem(item) {
        return item.id === id;
    }
    var itemindex = this.state.cart.findIndex(findItem);

    // console.log(itemindex);
    // console.log(this.state.cart[itemindex].count + 1);


    this.state.cart[itemindex].count = this.state.cart[itemindex].count + 1;
    this.forceUpdate();

  }

  deleteItem(id){
    function findItem(item) {
        return item.id === id;
    }
    var itemindex = this.state.cart.findIndex(findItem);

    console.log(itemindex);
    // console.log(this.state.cart[itemindex].count + 1);
    this.setState((prevState, props) => ({
      cart: prevState.cart.splice(itemindex,1)
    }));
    // this.state.cart = this.state.cart.splice([itemindex], 1); ;

    this.forceUpdate();

  }



  render() {
    return (
      <div  className="container">
        <h1>{this.props.heading}</h1>
        <div className="row">
        <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>img</th>
                <th>Title</th>
                <th>Price</th>
                <th>count</th>
                <th>total</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
            {this.state.cart.map(cartitem =>
              <tr key={cartitem.id}>
                <th><img src={cartitem.image} className="img-fluid rounded" width="50px" alt=""/></th>
                <td>{cartitem.title}</td>
                <td>{cartitem.price}</td>
                <td>
                  <div className="input-group counter">
                    <span className="input-group-btn"><button type="button" className="btn btn-default" disabled={cartitem.count < 2 ? 'disabled' : null} onClick={() => this.decreaseQnty(cartitem.id)}>-</button></span>
                    <input type="text" name="quant[9]" className="form-control input-number" value={cartitem.count} min="1" max="1000" />
                    <span className="input-group-btn"><button type="button" className="btn btn-default"  onClick={() => this.increaseQnty(cartitem.id)} >+</button></span>
                  </div>
                </td>
                <td><CountUp start={cartitem.price * cartitem.count - cartitem.price} end={cartitem.price * cartitem.count} duration={2} /></td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.deleteItem(cartitem.id)}>×</button></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}



export default Step1;
