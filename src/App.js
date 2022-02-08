import { useEffect, useState } from 'react';
import { load } from 'js-yaml';
import Data from "./data.yml"
import './App.css';

function App() {

// const [arrDataTemp, setArrDataTemp] = useState([])
// const [arrDataPow, setArrDataPow] = useState([])
 const [datetime, setDateTime] = useState() 

 const [temperature, setTemperature] = useState()
 const [power, setPower] = useState()
 const [time, setTime] = useState()

 const currentTime =() => {
   setTimeout(()=> {
   const currentdate = new Date()
   setDateTime (currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds())
   }, 1000);
  }

  console.log("time", datetime);
  
  const show = () =>{
    setTimeout(() => {
      fetch(Data)
      .then((response) => response.text())
      .then((yamlString) => load(yamlString))
      .then((data) => {
        
        for (let i=0; i < data.temperature.values.length; i++){        
           if(data.power.values[i].time === data.temperature.values[i].time ||data.power.values[i].time === setDateTime ){
            // setArrDataTemp(data.power.values)
            // setArrDataPow(data.temperature.values)
             setTime(data.power.values[i].time)
             setTemperature(data.temperature.values[i].value);
             setPower(data.power.values[i].value)

             console.log("cambio", data.power.values[i].time);
             console.log("temp", data.temperature.values[i].value);
             console.log("pow", data.power.values[i].value);
             console.log("time dentro del ", datetime);
             }
        }
      })     
    }, 5000); 
  }

    // const verifyHour =()=> {
      
    //     if(time === datetime){
    //       console.log("verificar")
    //       show()
    //     }
   
    // }  

   useEffect(()=>{
    
    show()
    currentTime()

     });

    


  return (
    <div className="App">
      <h1>Meteologica Eunice</h1>
      <p>Tiempo: {datetime} </p>
      <p>Temperatura: {temperature} Cº</p>
      <p>Power: {power}</p>
      <p>{time}</p>
      {/* <p>{temperature?.map((elm) => (<div>{elm.value}</div>))}</p> */}
    </div>
  );
}

export default App;
