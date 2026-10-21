import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then(({ data }) => setCourse(data))
      .catch((err) => setError(err.response?.data?.message || 'Course not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    try {
      await API.post('/enrollments/enroll', { courseId: id });
      setMessage('✅ Successfully enrolled!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
      setMessage('');
    }
  };

  if (loading) return <Container className="py-5">Loading...</Container>;
  if (!course) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <Card.Title className="fs-2">{course.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {course.category} • ${course.price}
          </Card.Subtitle>
          <Card.Text>{course.description}</Card.Text>
          <Card.Text><strong>Instructor:</strong> {course.instructor?.name}</Card.Text>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {user?.role === 'student' && (
            <Button variant="success" onClick={handleEnroll}>Enroll Now</Button>
          )}
          {!user && (
            <Button variant="primary" onClick={() => navigate('/login')}>Login to Enroll</Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CourseDetail;