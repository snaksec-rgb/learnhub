import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => (
  <Container className="py-5 text-center">
    <h1 className="display-3 fw-bold">Welcome to LearnHub 🎓</h1>
    <p className="lead">
      Your complete Learning Management System — browse courses, learn new skills, and grow your career.
    </p>
    <Row className="justify-content-center mt-4">
      <Col md="auto">
        <Link to="/courses">
          <Button size="lg" variant="primary">Browse Courses</Button>
        </Link>
      </Col>
      <Col md="auto">
        <Link to="/register">
          <Button size="lg" variant="outline-primary">Get Started</Button>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Home;