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
    accounts: ['juanita34','jn1233','juanitasuave','juanis', 'juanibanani']
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
  onCancel = event =>{
    navigate('main',{
      state:{
        data: undefined
      }
    })
  }
  generatePW(){
    const randomFunc = {
      upper : getRandomUpperCase,
      lower : getRandomLowerCase,
      number : getRandomNumber,
      symbol : getRandomSymbol
    };
    return(
      <label>amdeETNDU3FF?2NCEiakej23921</label>
    )
  }
  validatePW = np =>{
    
    var pwerrors = []
    
    if((np.length)<10){
      pwerrors.push('La contraseña debe tener más de 10 caracteres.')
    }
    
    var expression = /[a-z]/
    if(!expression.test(String(np))){
      pwerrors.push('La contraseña debe tener al menos una letra minúscula.')
    }
    expression = /[A-Z]/
    if(!expression.test(String(np))){
      pwerrors.push('La contraseña debe tener al menos una letra mayúscula.')
    }
    expression = /[0-9]/
    if(!expression.test(String(np))){
      pwerrors.push('La contraseña debe tener al menos un número.')
    }
    expression = /[$-/:-?{-~!"^_`\[\]]/
    if(!expression.test(String(np))){
      pwerrors.push('La contraseña debe tener al menos un caracter especial.')
    }
    
   
    return pwerrors
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
        <h2>Agregar nuevo usuario y contraseña</h2>
        <h5>Ingresa el nombre del usuario y la nueva contraseña.</h5>
        <FormStyles>
         
          <Form
            onSubmit={this.onSubmit}
            validate={values=>{
              const errors = {}
              if(values.nuevo_pw!==undefined){
                var pwerrors = ""
                if((values.nuevo_pw).length<10){
                  pwerrors = pwerrors.concat('La contraseña debe tener más de 10 caracteres, ')
                }
                
                var expression = /[a-z]/;
                if(!expression.test(String(values.nuevo_pw))){
                  pwerrors = pwerrors.concat('La contraseña debe tener al menos una letra minúscula, ')
                }
                
                expression = /[A-Z]/;
                if(!expression.test(String(values.nuevo_pw))){
                  pwerrors = pwerrors.concat('La contraseña debe tener al menos una letra mayúscula, ')
                }
                expression = /[0-9]/;
                if(!expression.test(String(values.nuevo_pw))){
                  pwerrors = pwerrors.concat('La contraseña debe tener al menos un número, ')
                }
                expression = /(\$|\#|\?|\-|\#|\&|\%|\*|_|!|)/;
                if(!expression.test(String(values.nuevo_pw))){
                  pwerrors = pwerrors.concat('La contraseña debe tener al menos un caracter especial, ')
                }
                if (pwerrors!=""){
                errors.nuevo_pw = pwerrors}
                if(values.nuevo_pw_confirm!==values.nuevo_pw){
                  errors.nuevo_pw_confirm = 'Las contraseñas no son iguales.'
                }
              }
              return errors
            } }
            render={({handleSubmit, form, submitting, invalid, pristine, values, }) => (
              <form onSubmit={handleSubmit}>
               <br></br>
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
                    <strong>Contraseña Sugerida <span>{this.generatePW()}</span></strong>
                    <br></br>
                    
                  </label>
                  </div>
                
                 

               <br></br>
               <Field name="nuevo_pw">
                  {({ input, meta }) => (
                    <div class="row">
                      <div class="column">
                      <label>Nueva Contraseña</label>
                      <input {...input} type="password" placeholder="Contraseña" />
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
                      <input {...input} type="password" placeholder="Contraseña" />
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
                    disabled={submitting || pristine }
                  >
                    Limpiar
                  </button>
                  <button type="button" onClick={this.onCancel}>
                    Cancelar
                    </button>
                  <button  type = "button" disabled={invalid}>
                    Agregar usuario y contraseña
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