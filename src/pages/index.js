import React, { Component } from "react"
import Layout from "../components/layout"
import FormStyles from "../components/FormStyles"
import { Form, Field, FormSpy } from "react-final-form"
import { navigate } from "gatsby"

const user = "miguelcienfuentes"
const pw = "aMiguelLeGustaElHelado20391?"

class Home extends Component {
  state = {
    new_vals: undefined,
  }

  onSubmit = () => {
    console.log(this.state.new_vals)
    if(this.state.new_vals.usuario == user && this.state.contrasenia == pw){
    navigate("accounts", {
      state: {
        data: undefined,
      },
    })
    }else{
      window.alert("Credenciales incorrectas.")
    }
  }
  changeStateValues = values => {
    this.setState({ new_vals: values })
  }

  handleLoginClickPassword = () => {
    console.log("Adiós  ")
  }

  render() {
    return (
      <Layout>
        <FormStyles>
          <Form
            onSubmit={this.onSubmit}
            render={({
              handleSubmit,
              form,
              submitting,
              invalid,
              pristine,
              values,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field name="usuario">
                    {({ input, meta }) => (
                      <div class="row">
                        <div class="column">
                          <label>Usuario</label>
                          <input {...input} type="text" placeholder="Usuario" />
                          {meta.touched}
                        </div>
                        
                        <div class="column">
                          {meta.error && <p>{meta.error}</p>}
                        </div>

                      </div>
                    )}
                  </Field>

                  <Field name="contrasenia">
                    {({ input, meta }) => (
                      <div class="row">

                        <div class="column">
                          <label>Contraseña</label>
                          <input {...input} type="password" />
                          {meta.touched}
                        </div>

                        <div class="column">
                          {meta.error && <p>{meta.error}</p>}
                        </div>
                        
                      </div>
                    )}
                  </Field>

                  <Field name="nuevo_pw_confirm_button">
                    {({ input, meta }) => (
                      <div class="row">

                        <div class="column">
                          {meta.error && <p>{meta.error}</p>}
                        </div>
                        <div>

                          <button type="submit" onClick={this.onCancel}>
                            Ingresar
                          </button>

                        </div>
                      </div>
                    )}
                  </Field>
                  <FormSpy
                  onChange={props => {
                    this.changeStateValues(values)
                  }}
                />
                </form>
              )
            }}
          />
        </FormStyles>
      </Layout>
    )
  }
}

export default Home