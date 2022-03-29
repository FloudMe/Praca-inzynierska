import { useState } from "react";
import Training from "./Training";
import {Container, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios'

const Trainings = ({id, trainingName, trainings }) => {
    const [show, setShow] = useState(false)

    const showCard = () => {
        setShow(!show)
    }

    const printToPdf = () => {
        const input = document.getElementById("tranings" + id)
        const width = input.style.width
        // const minHeight = input.style.minHeight
        console.log(input)

        input.style.width = '200mm'
        // input.style.minHeight = '297mm'

        html2canvas(input)
            .then((canvas) => {
                // const imgData = canvas.toDataURL('img/png')
                // const pdf = new jsPDF()
                // pdf.addImage(imgData, 'PNG', 5, 5)
                // pdf.output('dataurlnewwindow')
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 200; 
                const pageHeight = 295;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const doc = new jsPDF('p', 'mm');
                let heightLeft = imgHeight;
                let position = 0;

                doc.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.output('dataurlnewwindow')
            })

        input.style.width = width
        // input.style.minHeight = minHeight
    }

    const pdfFromBackend = () => {
        axios.get('http://localhost:4000/trainings/pdf',{
            method: "GET",
            responseType: "blob"
          })
            .then(res => {
                const file = new Blob([res.data], {
                    type: "application/pdf"
                  });
                  const fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
            })
    }

    return (
        <Container>
            <div id={"tranings" + id}>
                <Card className='mt-3' style={{cursor:'pointer'}} onClick={showCard}>
                    <Card.Header className="text-center" style={{fontSize:'large', userSelect:'none'}}>
                        {trainingName}
                    </Card.Header>
                </Card>
                {show && trainings.map(training => {
                    return <Training name={training.name} desc={training.description} howLong={training.howLong} />
                })}
            </div>
            
            {show && 
            <Container className>
                <Button className='mt-5' onClick={printToPdf}>
                    Render to pdf
                </Button>
                <Button className='mt-5' onClick={pdfFromBackend}>
                    Render pdf from Backend
                </Button>
            </Container>
                 
            }
        </Container>
    )
}

export default Trainings;