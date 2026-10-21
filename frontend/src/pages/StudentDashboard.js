import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, ProgressBar, Button } from 'react-bootstrap';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await API.get('/enrollments/my-courses');
      setEnrollments(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    }
  };

  useEffect(() => { load(); }, []);

  const updateProgress = async (id, progress) => {
    try {
      await API.put(`/enrollments/${id}/progress`, { progress });
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update progress');
    }
  };

  return (
    <Container className="py-5">
      <h2>🎓 Student Dashboard</h2>
      <p className="text-muted">Welcome, {user.name}!</p>
      {error && <Alert variant="danger">{error}</Alert>}
      {enrollments.length === 0 ? (
        <Alert variant="info">You are not enrolled in any courses yet. <a href="/courses">Browse courses</a></Alert>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {enrollments.map((en) => (
            <Col key={en._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{en.course?.title}</Card.Title>
                  <Card.Text>{en.course?.description?.substring(0, 100)}...</Card.Text>
                  <p className="mb-1">Progress: {en.progress}%</p>
                  <ProgressBar now={en.progress} className="mb-3" />
                  <Button size="sm" onClick={() => updateProgress(en._id, Math.min(100, en.progress + 10))}>
                    +10% Progress
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;