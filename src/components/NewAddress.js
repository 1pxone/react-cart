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
const onSubmit = ({formData}) => console.log("yay I'm valid!");
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
        const addresses = res.data.addresses.map(obj => obj);
        this.setState({ addresses});
      });
  }





  render() {
    return (
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
        </div>
      </div>
    );
  }
}



export default Step3;
