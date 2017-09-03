import React from 'react';
import axios from 'axios';
import Form from "react-jsonschema-form";

const newAdress = {
  title: "Добавить новый адрес",
  type: "object",
  required: ["title"],
  properties: {
    id: {type: "number", default: 5},
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

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses : [],
      schema: {
        title: "Добавить новый адрес",
        type: "object",
        required: ["title"],
        properties: {
          id: {type: "number", default: 5},
          isActive: {type: "boolean", default: false},
          title: {type: "string", title: "Название", default: "#" },
          country: {type: "string",title: "Страна", enum: ["Россия", "Казахстан", "Беларусь"],enumNames: ["Россия", "Казахстан", "Беларусь"],default: "Россия"},
          city: {type: "string", title: "Город"},
          address: {type: "string", title: "Адрес"},
          postcode: {type: "string", title: "Индекс"},
          additionalInfo: {type: "string", title: "Дополнительная информация"}
        }
      },
      uiSchema:{
        "additionalInfo": {
          "ui:widget": "textarea"
        },
        isActive: {"ui:widget": "hidden"},
        id: {"ui:widget": "hidden"}
      },
      formData:{}
    };
    this.addNewAddress = this.addNewAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.editAddress = this.editAddress.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:3001/user';
    axios.get(url)
      .then(res => {
        if( res.data.addresses.length > 0){
          let addressesCount = res.data.addresses.length;
          // console.log(addressesCount);
          const addresses = res.data.addresses.map(obj => obj);
          this.setState({addresses,schema: {...this.state.schema, properties: {...this.state.schema.properties, id:{type: "number", default: addressesCount}}}});
        }
      });
  }

  addNewAddress(data){
    // console.log(data.formData);
    let arr = [...this.state.addresses];
    let newAdresses = arr.push(data.formData);
    var url = 'http://localhost:3001/user';
    axios.patch(url, {
      "addresses": arr
    }).then(res => {
      let addressesCount = res.data.addresses.length;
        const addresses = res.data.addresses.map(obj => obj);
        this.setState({addresses,schema: {...this.state.schema, properties: {...this.state.schema.properties, id:{type: "number", default: addressesCount}}}});
    });
  };


  deleteAddress(id){
    let updatedAddresses = this.state.addresses.filter(function(address) {
        return address.id !== id;
    });
    var url = 'http://localhost:3001/user';
    axios.patch(url, {
      "addresses": updatedAddresses
    }).then(res => {
        const addresses = res.data.addresses.map(obj => obj);
        this.setState({addresses, schema:this.state.schema,uiSchema:this.state.uiSchema});
    });
  }

  editAddress(id){
    // let targetAddress = this.state.addresses.filter(function(address) {
    //     return address.id == id;
    // });
    var url = 'http://localhost:3001/user';
    // console.log(this.state.addresses[id]);
    let targetData = this.state.addresses[id];
    // saveTargetAddress(this.state.addresses[id])
    this.setState({formData: targetData});

  }

  render() {
    if(this.state.addresses.length < 1){
      return (
        <div  className="row py-5 justify-content-center">
          <div className="col-12 text-left">
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
                    <button onClick={() => this.editAddress(address.id)} type="button" className="btn btn-outline-primary">Редактировать</button>
                    <button onClick={() => this.deleteAddress(address.id)} className="btn btn-outline-danger">Удалить</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <Form
            schema={this.state.schema}
            uiSchema={this.state.uiSchema}
            onChange={log("changed")}
            onSubmit={this.addNewAddress}
            formData={this.state.formData}
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
