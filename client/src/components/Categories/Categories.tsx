import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Categories: React.FC = () => {
  return (
    <Nav className="bg-white text-dark">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/ssd">
                    SSD
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/hdd">
                    HDD
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/gpu">
                    GPU
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/cpu">
                    CPU
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/psu">
                    PSU
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/ram">
                    RAM
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/motherboard">
                    MotherBoard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/cooling">
                    Cooling
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/hardware/cases">
                    Cases
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Categories;
