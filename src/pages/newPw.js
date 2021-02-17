import React from "react"
import Layout from "../components/layout"
import { Form, Field, useFormState, FormSpy } from "react-final-form"
import FormStyles from "../components/FormStyles"
import { navigate } from "gatsby"
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js'


export default class CambiarPW extends React.Component {
  state = {
    new_vals: undefined,
    accs: undefined,
  }

  changeStateValues = values => {
    this.setState({ new_vals: values })
  }
  
  getData(){
    this.setState({
      accs: this.props.location.state.data.accs //THIS THIS THIS
    })
  }
  componentDidMount(){
    this.getData();
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
  onCancel = event => {
    navigate("/accounts", {
      state: {
        data: {
          accs: this.props.location.state.data.accs,
          flag: 1
        }
      },
    })
  }
  generatePW() {
    const password = require('secure-random-password');
    const rand = password.randomPassword({ length: 10, characters: [password.lower, password.upper, password.digits, password.symbols] })
    document.getElementById("randompw").innerHTML = rand;
  }

  encryptNewPw = pw_cambio =>{
    const masterHash = "0f7a48711090e39cf3da282d27430c7b6eeca63edba0c12f1a19eb6ddfc38f10"
    return CryptoJS.DES.encrypt(pw_cambio, masterHash).toString();
  }
  generateNewAccs = event =>{
    const pw_cambio = this.state.new_vals.nuevo_pw;
    const cuenta_cambio = this.state.new_vals.nuevo_usr;
    var old_accs = this.state.accs;
    console.log(old_accs[this.state.new_vals.nuevo_usr])
    old_accs[cuenta_cambio] = this.encryptNewPw(pw_cambio)
    return old_accs
  }
  
  onSubmit = event => {
    var cuentas = this.generateNewAccs()
    console.log(cuentas[this.state.new_vals.nuevo_])
    
    navigate('/accounts',{
      state:{
        data: {
          accs: cuentas,
          flag: 1
        }
      }
    })
    

  }

  render() {
    const cuentas = this.getJsonKeys(this.state.accs);
   
    return (
      <Layout>
        <h2>Agregar nueva cuenta y contraseña</h2>
        <h4>Ingresa el usuario que quieres añadir junto con la contraseña.</h4>
        <FormStyles>
          <Form
            onSubmit={this.onSubmit}
            validate={values => {
              
              const errors = {}
              if (values.nuevo_pw !== undefined) {
                var pwerrors = ""
                if (values.nuevo_pw.length < 10) {
                  pwerrors = pwerrors.concat(
                    "La contraseña debe tener más de 10 caracteres, "
                  )
                }

                var expression = /[a-z]/
                if (!expression.test(String(values.nuevo_pw))) {
                  pwerrors = pwerrors.concat(
                    "La contraseña debe tener al menos una letra minúscula, "
                  )
                }

                expression = /[A-Z]/
                if (!expression.test(String(values.nuevo_pw))) {
                  pwerrors = pwerrors.concat(
                    "La contraseña debe tener al menos una letra mayúscula, "
                  )
                }
                expression = /[0-9]/
                if (!expression.test(String(values.nuevo_pw))) {
                  pwerrors = pwerrors.concat(
                    "La contraseña debe tener al menos un número, "
                  )
                }
                expression = /[($-/:-?{-~!"^_`\[\])|#]/
                if (!expression.test(String(values.nuevo_pw))) {
                  pwerrors = pwerrors.concat(
                    "La contraseña debe tener al menos un caracter especial, "
                  )
                }
                if (pwerrors != "") {
                  errors.nuevo_pw = pwerrors
                }
                if (values.nuevo_pw_confirm !== values.nuevo_pw) {
                  errors.nuevo_pw_confirm = "Las contraseñas no son iguales."
                }
              }
              return errors
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
                <Field name="nuevo_usr">
                  {({ input, meta }) => (
                    <div>
                      <label>Nuevo usuario</label>
                      <input {...input} type="text" placeholder="Usuario" />
                      {meta.touched}
                    </div>
                  )}
                </Field>
                <br></br>
                <div>
                <label>
                  <strong>Contraseña Sugerida</strong>
                  <br></br>
                </label>

                <label>
                  
                  <strong><span id="randompw"></span></strong>
                  <br></br>
                  <button type="button" onClick={this.generatePW}>
                    Generar Contraseña
                  </button>
                
                </label>
                </div>
                
                <br></br>
                <Field name="nuevo_pw">
                  {({ input, meta }) => (
                    <div class="row">
                      <div class="column">
                        <label>Nueva Contraseña</label>
                        <input
                          {...input}
                          type="password"
                          placeholder="Contraseña"
                        />
                        {meta.touched}
                      </div>
                      <div class="column">
                        {meta.error && <p>{meta.error}</p>}
                      </div>
                    </div>
                  )}
                </Field>
                <br></br>
                <br></br>
                <Field name="nuevo_pw_confirm">
                  {({ input, meta }) => (
                    <div class="row">
                      <div class="column">
                        <label>Confirmar Contraseña</label>
                        <input
                          {...input}
                          type="password"
                          placeholder="Contraseña"
                        />
                        {meta.touched}
                      </div>
                      <div class="column">
                        {meta.error && <p>{meta.error}</p>}
                      </div>
                    </div>
                  )}
                </Field>
                <br></br>
                <div className="buttons">
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Limpiar
                  </button>
                  <button type="button" onClick={this.onCancel}>
                    Cancelar
                  </button>
                  <button type="submit" disabled={invalid}>
                    Cambiar Contraseña
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
