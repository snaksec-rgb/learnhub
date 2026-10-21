import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Row, Col } from 'react-bootstrap';
import API from '../services/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses').then(({ data }) => setCourses(data));
  }, []);

  const totalPrice = courses.reduce((s, c) => s + c.price, 0);

  return (
    <Container className="py-5">
      <h2>⚙️ Admin Dashboard</h2>

      <Row className="g-4 my-3">
        <Col md={4}>
          <Card className="text-center"><Card.Body>
            <h1>{courses.length}</h1><p>Total Courses</p>
          </Card.Body></Card>
        </Col>
        <Col md={4}>
          <Card className="text-center"><Card.Body>
            <h1>{new Set(courses.map((c) => c.instructor?._id)).size}</h1><p>Instructors</p>
          </Card.Body></Card>
        </Col>
        <Col md={4}>
          <Card className="text-center"><Card.Body>
            <h1>${totalPrice}</h1><p>Total Course Value</p>
          </Card.Body></Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h5>All Courses</h5>
          <Table hover>
            <thead>
              <tr><th>Title</th><th>Instructor</th><th>Category</th><th>Price</th></tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.instructor?.name}</td>
                  <td>{c.category}</td>
                  <td>${c.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;