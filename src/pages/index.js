import React from "react"
import Layout from "../components/layout"
import { Form, Field, useFormState, FormSpy } from 'react-final-form'
import FormStyles from '../components/FormStyles'
import {navigate} from "gatsby"
import Twocols from '../components/twocols'

function getRandomUpperCase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+65);
 }
 function getRandomLowerCase(){
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}
function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random()*10)+48);
}
function getRandomSymbol(){
  var symbol = "!@#$%^&*(){}[]=<>/,.|~?";
  return symbol[Math.floor(Math.random()*symbol.length)];
}


export default class CambiarPW extends React.Component{
  state ={
    new_vals : undefined,
    accounts: ['Google','Amazon','Spotify','Instagram', 'Gmail','Steam']
  }

  changeStateValues = values =>{
    this.setState({new_vals: values})
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

  generatePW(){
    const randomFunc = {
      upper : getRandomUpperCase,
      lower : getRandomLowerCase,
      number : getRandomNumber,
      symbol : getRandomSymbol
    };
    return(
      <label>amdeETNDUSENCEiakej23921</label>
    )
  }
  onSubmit = event =>{
    navigate('main',{
      state:{
        data: this.state.new_vals
      }
    })
  }



  render(){
    const cuentas = this.state.accounts
    return(
      <Layout>
        <h2>Cambiar una contraseña</h2>
        <h4>Elige una cuenta para la cual quieres cambiar la contraseña</h4>
        <FormStyles>
         
          <Form
            onSubmit={this.onSubmit}
            validate={values=>{
              return true
            } }
            render={({handleSubmit, form, submitting, invalid, pristine, values, }) => (
              <form onSubmit={handleSubmit}>
               
               <div>
               {cuentas.map(cuenta =>(
               <label>
                
                <Field
                  name="cuentas"
                  component="input"
                  type="radio"
                  value={cuenta}
                />{' '}
                {cuenta}
                <br></br>
              </label>
              
              ))}
               </div> 
               <br></br>
                 
                  <label>
                    <strong>Contraseña Sugerida</strong>
                    <br></br>
                    
                  </label>
                  
                  <label>
                    <br></br>
                    <strong>{this.generatePW()}</strong>
                    <br></br>
                    
                  </label>
                 

               <br></br>
               <Field name="nuevopw">
                  {({ input, meta }) => (
                    <div>
                      <label>Nueva Contraseña</label>
                      <input {...input} type="password" placeholder="Contraseña" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <br></br>
                <br></br>
               <Field name="nuevopwconfirm">
                  {({ input, meta }) => (
                    <div>
                      <label>Confirmar Contraseña</label>
                      <input {...input} type="password" placeholder="Contraseña" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <br></br>
                <div className="buttons">
                  
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine }
                  >
                    Limpiar
                  </button>
                  <button  type = "button" disabled={invalid}>
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