import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table } from 'react-bootstrap';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: '', price: 0 });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadCourses = async () => {
    const { data } = await API.get('/courses');
    setCourses(data.filter((c) => c.instructor?._id === user._id));
  };

  useEffect(() => { loadCourses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await API.post('/courses', form);
      setForm({ title: '', description: '', category: '', price: 0 });
      setMessage('✅ Course created!');
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await API.delete(`/courses/${id}`);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <Container className="py-5">
      <h2>👨‍🏫 Instructor Dashboard</h2>
      <p className="text-muted">Welcome, {user.name}!</p>

      <Row className="g-4">
        <Col md={5}>
          <Card>
            <Card.Body>
              <h5>Create New Course</h5>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleCreate}>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
                </Form.Group>
                <Button type="submit">Create Course</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card>
            <Card.Body>
              <h5>My Courses ({courses.length})</h5>
              <Table hover>
                <thead>
                  <tr><th>Title</th><th>Category</th><th>Price</th><th></th></tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c._id}>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>${c.price}</td>
                      <td><Button size="sm" variant="danger" onClick={() => handleDelete(c._id)}>Delete</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InstructorDashboard;