import React, { Component } from "react"
import Layout from "../components/layout"
import FormStyles from "../components/FormStyles"
import { Form, Field, FormSpy } from "react-final-form"
import { navigate } from "gatsby"

const user = "miguelcienfuentes"
//const pw = "aMiguelLeGustaElHelado20391?"
const pw = "holi"

class Home extends Component {
  state = {
    new_vals: undefined,
  }

  onSubmit = () => {
    navigate("accounts", {
      state: {
        data: {
          flag: 0,
        },
      },
    })
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
        <div class="loginContainer">
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
                  <div class="formContainer">
                    <form class="form" onSubmit={handleSubmit}>
                      <p class="loginHeader">
                        {" "}
                        Ingresa tus credenciales para acceder
                      </p>
                      <Field name="usuario">
                        {({ input, meta }) => (
                          <div class="rowCustom">
                            <label>Usuario</label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Usuario"
                            />
                            {meta.touched}
                          </div>
                        )}
                      </Field>

                      <Field name="contrasenia">
                        {({ input, meta }) => (
                          <div class="rowCustom">
                            <label>Contraseña</label>
                            <input
                              {...input}
                              type="password"
                              placeholder="Contraseña"
                            />
                            {meta.touched}
                          </div>
                        )}
                      </Field>

                      <Field name="nuevo_pw_confirm_button">
                        {({ input, meta }) => (
                          <div class="rowCustom centerFlex">
                            <button
                              class="loginButton"
                              type="submit"
                              onClick={this.onCancel}
                            >
                              Ingresar
                            </button>
                          </div>
                        )}
                      </Field>
                      <FormSpy
                        onChange={props => {
                          this.changeStateValues(values)
                        }}
                      />
                    </form>
                  </div>
                )
              }}
            />
          </FormStyles>
        </div>
      </Layout>
    )
  }
}

export default Home
