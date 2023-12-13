import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Form,
    FormControl,
    Modal,
    Row
} from "react-bootstrap";
import {Context} from "../../index";
import FormContext from "react-bootstrap/FormContext";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', device.selectedType.id)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление нового девайса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container className={"d-flex flex-row p-0 mb-3"}>
                        <Dropdown className={"me-3"}>
                            <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                            <DropdownMenu>
                                {device.types.map(type =>
                                    <DropdownItem
                                        key={type.id}
                                        onClick={() => device.setSelectedType(type)}
                                    >
                                        {type.name}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown className={"me-3"}>
                            <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                            <DropdownMenu>
                                {device.brands.map(brand =>
                                    <DropdownItem
                                        key={brand.id}
                                        onClick={() => device.setSelectedBrand(brand)}
                                    >
                                        {brand.name}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </Container>

                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={"mb-3"}
                        placeholder={"Введите название устройства"}
                        type={"text"}
                    />

                    <FormControl
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className={"mb-3"}
                        placeholder={"Введите стоимость устройства"}
                        type={"number"}
                    />

                    <FormControl
                        className={"mb-3"}
                        type={"file"}
                        onChange={selectFile}
                    />

                    <Button
                        variant={"outline-dark"}
                        className={"mb-3"}
                        onClick={addInfo}
                    >
                        Добавить новое свойсто
                    </Button>
                    {
                        info.map(i =>
                            <Row
                                key={i.number}
                                className={"mb-2"}
                            >
                                <Col md={4}>
                                    <FormControl
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder={"Введите название характеристики"}
                                    />
                                </Col>

                                <Col md={4}>
                                    <FormControl
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                        placeholder={"Введите описание характеристики"}
                                    />
                                </Col>

                                <Col md={4}>
                                    <Button
                                        variant={"outline-danger"}
                                        onClick={() => deleteInfo(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>


                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={() => onHide()}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
