import './app-list-item.css';
import {Container, Row, Col} from 'react-bootstrap';
import deleteIcon from './delete_icon.png';

function ListItem (props) {
    
    return (
        <div className='word_container'>
        <Container className='words_container'>
            <Row className='word_line'>
                <Col className='foreign_word_container'
                     lg={2}>
                    <div className='nested_element'><div className='sec_nested'>{props.word}</div></div>
                </Col>

                <Col className='translation_container'
                     lg={4}>
                    <div className='nested_element'> <div className='sec_nested'>{props.translation}</div></div>
                </Col>

                <Col className='word_category'
                     lg={4}>
                    <div className='nested_element'><div className='sec_nested'> {props.category} </div></div>
                </Col>
                <Col className='delete_button'
                     lg={1}>
                    <img src={deleteIcon} width='20px' height='20px' onClick={props.onDelete}></img>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default ListItem;