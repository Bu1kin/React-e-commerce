import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Col className={"d-flex flex-wrap"}>
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    style={{cursor: 'pointer'}}
                    className={"p-2 me-2 mb-4"}
                >
                    {brand.name}
                </Card>
            )}
        </Col>
    );
});

export default BrandBar;
