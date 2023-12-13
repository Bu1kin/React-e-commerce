import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../assets/star.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, []);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>

                <Col md={4}>
                    <Row className={"d-flex flex-column align-items-center"}>
                        <h2 className={"d-flex align-items-center justify-content-center"}>
                            {device.name}
                        </h2>
                        <div
                            className={"d-flex align-items-center justify-content-center"}
                            style={{background: `url(${star}) no-repeat center center`, width: 150, height: 150, backgroundSize: 'contain', fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className={"d-flex flex-column align-items-center justify-content-around"}
                        style={{width: 300, height: 300, fontSize: 32, border: '4px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button
                            variant={"outline-success"}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <h1 className={"mt-3"}>Характеристики:</h1>
            <Row className={"d-flex flex-column ms-0 mt-3"}>
                <div>
                    {device.info.map((info, index) =>
                        <Row
                            key={info.id}
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', paddingTop: 10, paddingBottom: 10}}

                        >
                            <div>
                                {info.title}: {info.description}
                            </div>
                        </Row>
                    )}
                </div>

            </Row>
        </Container>
    );
};

export default DevicePage;
