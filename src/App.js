import React, {useState} from 'react';
import { useReducer } from 'react';
import {Arrays} from './myComponentes/Arrays';
import "./style.css"
import Digitbutton from './Digitbutton';
import Operationbutton from './OperationButton';
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: 'clear',
  DELETE_DIGIT : "delete-digit",
  EVALUATE : 'evaluate'
}


function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0"){

        return state
      } 
      if(payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    

   case ACTIONS.CHOOSE_OPERATION:
    if(state.currentOperand ==null && state.previousOperand == null){
      return state
    }

    if(state.currentOperand == null ){
      return{
        ...state,
        operation:payload.operation
      }
    }
    if(state.previousOperand == null){
      return {
        ...state,
        operation:payload.operation,
        previousOperand:state.currentOperand,
        currentOperand:null,
      }
    }

      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
    
  case ACTIONS.CLEAR:
        return{}



case ACTIONS.DELETE_DIGIT:
  if(state.currentOperand == null){
    return state
  }
  if(state.currentOperand.length === 1){
    return {
      ...state,
      currentOperand:null
    }
  }
  return{
    ...state,
    currentOperand:state.currentOperand.slice(0,-1)
  }

  case ACTIONS.EVALUATE:
            if(state.operation == null || state.currentOperand==null || state.previousOperand==null){
              return state
            }  
            return{
              ...state,
              previousOperand:null,
              operation:null,
              currentOperand:evaluate(state)
            }

 
           
  }
}




function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)){
    return ""
  }
  let computation = ""
  switch(operation){
    case "+":
      computation=prev + current
      break
    case "-":
      computation=prev - current
      break
    case "*":
      computation=prev * current
      break
    case "÷":
      computation=prev / current
      break
  }

  return computation.toString()
}



function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})




  return (
       <div className="calculator-grid">
     <div className="output">
       <div className="previous-operand">{previousOperand} {operation}</div>
       <div className="current-operand">{currentOperand}</div>
     </div>
  <button className='span-two' onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
   <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
   <Operationbutton operation="÷" dispatch={dispatch}/>
   <Digitbutton digit="1" dispatch={dispatch}/>
   <Digitbutton digit="2" dispatch={dispatch}/>
   <Digitbutton digit="3" dispatch={dispatch}/>
   <Operationbutton operation="*" dispatch={dispatch}/>
   <Digitbutton digit="4" dispatch={dispatch}/>
   <Digitbutton digit="5" dispatch={dispatch}/>
   <Digitbutton digit="6" dispatch={dispatch}/>
   <Operationbutton operation="+" dispatch={dispatch}/>
   <Digitbutton digit="7" dispatch={dispatch}/>
   <Digitbutton digit="8" dispatch={dispatch}/>
   <Digitbutton digit="9" dispatch={dispatch}/>
   <Operationbutton operation="-" dispatch={dispatch}/>
   <Digitbutton digit="." dispatch={dispatch}/>
   <Digitbutton digit="0" dispatch={dispatch}/>

   <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>

       </div>      




  );
}

export default App;
