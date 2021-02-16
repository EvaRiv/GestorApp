import React, { Component } from "react"
import Layout from "../components/layout"
import classes from "../pages/account.css"
import FormStyles from "../components/FormStyles"
import { Form, Field, FormSpy } from "react-final-form"

import Google from "../images/Google.png"

class Accounts extends Component {
  handleLoginClick = () => {
    console.log("Hola")
  }

  render() {
    return (
      <Layout>
        <FormStyles>
          <div>
            <form onSubmit={this.handleLoginClick}>
              <img src={Google} className={classes.GL}  />
            </form>
          </div>
          <Form
            onSubmit={this.handleLoginClick}
            render={() => {
              return (
                <div>
                  <form onSubmit={this.handleLoginClick}>
                    <img className={classes.GL} src={Google} />
                  </form>
                </div>
              )
            }}
          />
        </FormStyles>
      </Layout>
    )
  }
}

export default Accounts
