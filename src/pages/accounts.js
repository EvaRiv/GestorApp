import React from "react"
import Layout from "../components/layout"
import { Form, Field, useFormState, FormSpy } from "react-final-form"
import FormStyles from "../components/FormStyles"
import { navigate } from "gatsby"
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js'

var cuentas_ini = require('../files/registers.json');


export default class SeeAccounts extends React.Component {
  state = {
    new_vals: undefined,
    accs : undefined,
    flag : undefined
  }
  getData(){
    var bandera = this.props.location.state.data.flag
    if (bandera===0){ //si vengo del home
      this.setState({
          accs : cuentas_ini,
          flag : bandera
      })
    }else{
      this.setState({
        accs : this.props.location.state.data.accs,
        flag : bandera
    })
    }
  }
  componentDidMount(){
    this.getData()
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
  
  
  chngPw = event =>{
    navigate("/changePw", {
      state: {
        data: {
          accs: this.state.accs
        }
      },
    })
  }

  addPw = event =>{
    navigate("/newPw", {
      state: {
        data: {
          accs: this.state.accs
        }
      },
    })
  }
  revealPw = event =>{
  
    var mp_entered = String(this.state.new_vals.master)
    
    var masterHash = String(sha256(mp_entered));
    var user_selected = String(this.state.new_vals.cuentas)
    var encrypted = this.state.accs[user_selected] 
 
    
    var decrypted = CryptoJS.DES.decrypt(encrypted, masterHash);
    
    var result = CryptoJS.enc.Utf8.stringify(decrypted);
    
    document.getElementById("pw_revealed").innerHTML = result;
    


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
    const cuentas = this.getJsonKeys(this.state.accs);
    return (
      <Layout>
        <div class="accountsContainer">
          <div class = "form">
          <p class="loginHeader">Ver contraseñas almacenadas</p>
        <p class="accountsSubHeader">Elige una cuenta para la cual quieres revelar la contraseña.</p>
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
                      <div class="rowCustomAccounts">

                          <label>Ingresa la contraseña maestra para ver una contraseña</label>
                          <input {...input} type="password" />
                          {meta.touched}

                        
                        <div class="column">
                          {meta.error && <p>{meta.error}</p>}
                        </div>

                      </div>
                    )}
                  </Field>
                
                <div className="rowCustomAccounts">

                  <button class = "loginButton" type="button" onClick={this.revealPw}>
                    Revelar contraseña
                  </button>
                  <button class = "loginButton" type="button" onClick={this.addPw}>
                    Agregar cuenta y contraseña
                  </button>
                  <button class = "loginButton" type="button" onClick={this.chngPw}>
                    Cambiar una contraseña
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
          </div>
        </div>

      </Layout>
    )
  }
}
