import React from 'react';
import { Nav } from 'react-bootstrap';

const Categories: React.FC = () => {
    return (
        <Nav className="bg-white text-dark">
            <Nav.Item>
                <Nav.Link href="#ssd">SSD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#hdd">HDD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#gpu">GPU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#cpu">CPU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#psu">PSU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#ram">RAM</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#motherboards">Motherboards</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#cooling">Cooling</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#cases">Cases</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Categories;
