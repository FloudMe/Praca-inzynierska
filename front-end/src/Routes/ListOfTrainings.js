import {React, useState, useEffect} from "react";
import axios from 'axios'
import Trainings from "../Component/Trainings";
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListOfTrainings = () =>{
    const [trainings, setTrainings] = useState([])
    let id = -1

    useEffect( ()=>{
        axios.get('http://localhost:4000/trainings')
            .then(res =>{
                setTrainings(res.data.trainigs)
            })
    }, [])

    return (
      <div className="ListOfTrainings">
          {trainings.map(training => {
            {id = id + 1}
            return  <Container>
                        <Trainings id={id} trainingName={training.trainigName} trainings={training.exercises} />
                    </Container>
          })}
      </div>
    );
}
  
export default ListOfTrainings;