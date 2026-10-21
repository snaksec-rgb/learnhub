import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {course.category} • ${course.price}
        </Card.Subtitle>
        <Card.Text>{course.description.substring(0, 100)}...</Card.Text>
        <Card.Text className="small text-muted">
          By {course.instructor?.name || 'Unknown'}
        </Card.Text>
        <Link to={`/courses/${course._id}`}>
          <Button variant="primary" size="sm">View Course</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;