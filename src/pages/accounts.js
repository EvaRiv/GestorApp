import React from "react"
import Layout from "../components/layout"
import { Form, Field, useFormState, FormSpy } from "react-final-form"
import FormStyles from "../components/FormStyles"
import { navigate } from "gatsby"
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js'

var accs = require('../files/registers.json');


export default class SeeAccounts extends React.Component {
  state = {
    new_vals: undefined,
    
  }
  getJsonKeys = data =>{
    var cuentas = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
         cuentas.push(key)
      }
   }
   return cuentas
  }

  changeStateValues = values => {
    this.setState({ new_vals: values })
  }
  
  onCancel = event => {
    navigate("main", {
      state: {
        data: undefined,
      },
    })
  }
  revealPw = event =>{
    var masterHash = String(sha256("chuiYMikeSonPesimosEnBeerPong123?"));
    var data_stuff = {}
    var arr = ["!s$C95$g3h","Le$T6R^VQk","n#yY8y#c2q","6%a6RmU8%Z","N#9GZQKhPk"];
    var i = 0;
    for(var key in accs){
      data_stuff[key] = CryptoJS.DES.encrypt(arr[i], masterHash);
    }
    console.log(data_stuff)
    const jsonfile = require('jsonfile')
 
    const file = './registers.json'
    
    jsonfile.writeFile(file, data_stuff, function (err) {
      if (err) console.error(err)
})
    
   
    
    //document.getElementById("pw_revealed").innerHTML = result;
  }
  
  onSubmit = event => {
    /*
    navigate('main',{
      state:{
        data: this.state.new_vals
      }
    })
    */

  }

  render() {
    const cuentas = this.getJsonKeys(accs);
    return (
      <Layout>
        <h2>Ver contraseñas almacenadas</h2>
        <h4>Elige una cuenta para la cual quieres revelar la contraseña.</h4>
        <FormStyles>
          <Form
            onSubmit={this.onSubmit}
            validate={values => {
              
              
            }}
            render={({
              handleSubmit,
              form,
              submitting,
              invalid,
              pristine,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  {cuentas.map(cuenta => (
                    <label>
                      <Field
                        name="cuentas"
                        component="input"
                        type="radio"
                        value={cuenta}
                      />{" "}
                      {cuenta}
                      <br></br>
                    </label>
                  ))}
                </div>
                <br></br>
                <div>
                <span id="pw_revealed"></span>
                </div>
                
                <Field name="master">
                    {({ input, meta }) => (
                      <div class="row">
                        <div class="column">
                          <label>Ingresa la contraseña maestra para ver una contraseña</label>
                          <input {...input} type="password" />
                          {meta.touched}
                        </div>
                        
                        <div class="column">
                          {meta.error && <p>{meta.error}</p>}
                        </div>

                      </div>
                    )}
                  </Field>
                
                <div className="buttons">

                  <button type="button" onClick={this.revealPw}>
                    Revelar contraseña
                  </button>
                </div>

                <FormSpy
                  onChange={props => {
                    this.changeStateValues(values)
                  }}
                />
              </form>
            )}
          />
        </FormStyles>
      </Layout>
    )
  }
}
