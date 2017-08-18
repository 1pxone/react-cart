import React from 'react';
import axios from 'axios';
import Form from "react-jsonschema-form";

const newAdress = {
  title: "Добавить новый адрес",
  type: "object",
  required: ["title"],
  properties: {
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
  }
}

const log = (type) => console.log.bind(console, type);

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses : []
    };
    this.addNewAddress = this.addNewAddress.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:3001/user';

    axios.get(url)
      .then(res => {
        const addresses = res.data.addresses.map(obj => obj);
        this.setState({ addresses});
      });
  }

  addNewAddress(){
    var url = 'http://localhost:3001/user';
    axios.post(url, {
      "id":123,
      "isAuth": false,
      "uid": 123,
      "firstname": "Иван",
      "surname": "Кулек",
      "addresses": [{
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

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.forceUpdate();
  }

  render() {
    if(this.state.addresses.length < 1){
      return (
        <div  className="row">
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
            onSubmit={log("submitted")}
            onError={log("errors")}  >
            <div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </Form>
          </div>
        </div>
      )
    }
    return (
      <div  className="row">
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
                <a href="#" className="btn btn-primary">Редактировать</a>
                <a href="#" className="btn btn-danger">Удалить</a>
              </div>
            </div>
          )}
        </div>
        <div className="col">
          <Form
          schema={newAdress}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}  >
          <div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </Form>
        <button onClick={this.addNewAddress} className="btn btn-warning my-5">
          Выйти
        </button>
        </div>

      </div>
    );
  }
}



export default Step3;
