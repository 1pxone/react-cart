import React from 'react';
import axios from 'axios';
import Form from "react-jsonschema-form";

const newAdress = {
  title: "Добавить новый адрес",
  type: "object",
  required: ["title"],
  properties: {
    id: {type: "number", default: 4},
    isActive: {type: "boolean", default: false},
    title: {type: "string", title: "Название", default: "#" },
    country: {type: "string",title: "Страна", enum: ["Россия", "Казахстан", "Беларусь"],enumNames: ["Россия", "Казахстан", "Беларусь"],default: "Россия"},
    city: {type: "string", title: "Город"},
    address: {type: "string", title: "Адрес"},
    postcode: {type: "string", title: "Индекс"},
    additionalInfo: {type: "string", title: "Дополнительная информация"}
  }
}

const uiSchema = {
  "additionalInfo": {
    "ui:widget": "textarea"
  },
  isActive: {"ui:widget": "hidden"},
  id: {"ui:widget": "hidden"}
}

const log = (type) => console.log.bind(console, type);

(function getid(){
  var url = 'http://localhost:3001/user';
  axios.get(url)
    .then(res => {
        let addresses = res.data.addresses.length;
        console.log(addresses);
    });
});




const onSubmit = ({formData}) => {
  var url = 'http://localhost:3001/user';
  axios.get(url)
    .then(res => {
        let addresses = res.data.addresses;
        addresses.push(formData);
        axios.patch(url, {
          "addresses": addresses
        })
    });
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses : []
    };
    this.addNewAddress = this.addNewAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:3001/user';
    axios.get(url)
      .then(res => {
        if( res.data.addresses.length > 0){
          const addresses = res.data.addresses.map(obj => obj);
          this.setState({ addresses});
        }
      });
  }

  addNewAddress(formData){
    let arr = [...this.state.addresses];
    let newAdresses = arr.push();
    var url = 'http://localhost:3001/user';
    axios.patch(url, {
      "addresses": arr
    })
  }


  deleteAddress(id){
    let updatedAddresses = this.state.addresses.filter(function(address) {
        return address.id !== id;
    });
    var url = 'http://localhost:3001/user';
    axios.patch(url, {
      "addresses": updatedAddresses
    })
    .then(function (response) {

    })
    .catch(function (error) {

    });
  }

  render() {
    if(this.state.addresses.length < 1){
      return (
        <div  className="row py-5">
          <div className="col-12">
            <h1>{this.props.heading}</h1>
          </div>
          <div className="col">
            <p>У вас нет адресов! Добавить?</p>
          </div>
          <div className="col">
            <Form
            schema={newAdress}
            uiSchema={uiSchema}
            onChange={log("changed")}
            onSubmit={({formData}) => this.addNewAddress({formData})}
            onError={log("errors")}>
              <div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </Form>
            <button onClick={() => this.addNewAddress} className="btn btn-warning my-5">
              Добавить два адреса
            </button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div  className="row py-5">
          <div className="col-12">
            <h1>{this.props.heading}</h1>
          </div>
          <div className="col">
          <legend>Ваши адреса:</legend>
            {this.state.addresses.map(address =>
              <div className="card mb-3" key={address.id}>
                <div className="card-body">
                  <h4 className="card-title">{address.title}</h4>
                  <p className="card-text">{address.country}, {address.city}</p>
                  <p className="card-text">{address.address}, {address.postcode}</p>
                  <p className="card-text">{address.additionalInfo}</p>
                  <div className="row justify-content-around " >
                    <button type="button" className="btn btn-outline-primary">Редактировать</button>
                    <button onClick={() => this.deleteAddress(address.id)} className="btn btn-outline-danger">Удалить</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <Form
            schema={newAdress}
            uiSchema={uiSchema}
            onChange={log("changed")}
            onSubmit={onSubmit}
            onError={log("errors")}>
              <div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </Form>
            <button onClick={() => this.addNewAddress} className="btn btn-warning my-5">
              Добавить два адреса
            </button>
          </div>
        </div>
      );
    }

  }
}



export default Step3;
