import React from 'react';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const Categories: React.FC = () => {
    return (
        <Nav className="bg-white text-dark">
            <Nav.Item>
                <Nav.Link as={Link} to="/ssd">SSD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/hdd">HDD</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/gpu">GPU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cpu">CPU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/psu">PSU</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/ram">RAM</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/motherboard">MotherBoard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cooling">Cooling</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cases">Cases</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Categories;
