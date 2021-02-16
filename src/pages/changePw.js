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
    accounts: ["juanita34", "jn1233", "juanitasuave", "juanis", "juanibanani"],
  }

  changeStateValues = values => {
    this.setState({ new_vals: values })
  }
  /*
  getData(){
    this.setState({
      accounts: this.props.location.state.data //THIS THIS THIS
    })
  }
  componentDidMount(){
    this.getData();
  }
  */
  onCancel = event => {
    navigate("main", {
      state: {
        data: undefined,
      },
    })
  }
  generatePW() {
    const password = require('secure-random-password');
    const rand = password.randomPassword({ length: 10, characters: [password.lower, password.upper, password.digits, password.symbols] })
    document.getElementById("randompw").innerHTML = rand;
  }
  validatePW = np => {
    var pwerrors = []

    if (np.length < 10) {
      pwerrors.push("La contraseña debe tener más de 10 caracteres.")
    }

    var expression = /[a-z]/
    if (!expression.test(String(np))) {
      pwerrors.push("La contraseña debe tener al menos una letra minúscula.")
    }
    expression = /[A-Z]/
    if (!expression.test(String(np))) {
      pwerrors.push("La contraseña debe tener al menos una letra mayúscula.")
    }
    expression = /[0-9]/
    if (!expression.test(String(np))) {
      pwerrors.push("La contraseña debe tener al menos un número.")
    }
    expression = /(\$|\#|\?|\-|\#|\&|\%|\*|_|!|)/
    if (!expression.test(String(np))) {
      pwerrors.push("La contraseña debe tener al menos un caracter especial.")
    }

    return pwerrors
  }
  onSubmit = event => {
    /*
    navigate('main',{
      state:{
        data: this.state.new_vals
      }
    })
    */
   
    console.log("aaaaaaaaaaaa")
    const masterKey = "holiwis"
    const masterHash = String(sha256(masterKey));
    var encrypted = CryptoJS.DES.encrypt("gestor de Eva y Miguel", masterHash);
    var decrypted = CryptoJS.DES.decrypt(encrypted, masterHash);
    console.log(encrypted)
    var result2 = CryptoJS.enc.Utf8.stringify(decrypted);
    console.log(result2)
  }

  render() {
    const cuentas = this.state.accounts
    return (
      <Layout>
        <h2>Cambiar una contraseña</h2>
        <h4>Elige una cuenta para la cual quieres cambiar la contraseña</h4>
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
                expression = /[$-/:-?{-~!"^_`\[\]]/
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
                <label>
                  <strong>Contraseña Sugerida</strong>
                  <br></br>
                </label>

                <label>
                  
                  <strong><span id="randompw">{this.generatePW}</span></strong>
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
