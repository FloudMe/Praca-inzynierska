import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Training = ({ name, desc, howLong }) => {
  return (
    <>
        <Card className='mt-3' bg="Primary" style={{width:'center', padding:'1em'}}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                    <Card.Text>
                    {desc}
                    </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Work for {howLong}</ListGroupItem>
            </ListGroup>
        </Card>
    </>
  )
}

export default Training;