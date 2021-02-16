import React, { Component } from "react"
import Layout from "../components/layout"
import FormStyles from "../components/FormStyles"
import { Form, Field, FormSpy } from "react-final-form"

class Home extends Component {
  handleLoginClick = () => {
    console.log("Hola")
  }

  handleLoginClickPassword = () => {
    console.log("Adiós  ")
  }

  render() {
    return (
      <Layout>
        <FormStyles>
          <Form
            onSubmit={this.handleLoginClick}
            render={() => {
              return (
                <form onSubmit={this.handleLoginClick}>
                  <Field name="nuevo_pw_confirm">
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

                  <Field name="nuevo_pw_confirm_login">
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

                          <button type="button" onClick={this.onCancel}>
                            Ingresar
                          </button>

                        </div>
                      </div>
                    )}
                  </Field>
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