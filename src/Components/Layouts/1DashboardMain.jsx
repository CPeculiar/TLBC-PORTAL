import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const stats = [
    { title: 'Members', value: 111, color: '#17a2b8' },
    { title: 'Departments', value: 6, color: '#17a2b8' },
    { title: 'Cell Groups', value: 6, color: '#ffc107' },
    { title: 'Funds', value: 9, color: '#dc3545' },
  ];

  const memberData = [
    { name: 'Male', value: 45 },
    { name: 'Female', value: 55 },
  ];

  const COLORS = ['#17a2b8', '#dc3545'];

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} sm={6} lg={3} className="mb-4">
            <Card bg="light">
              <Card.Body>
                <Card.Title>{stat.title}</Card.Title>
                <Card.Text className="h2" style={{ color: stat.color }}>
                  {stat.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Members</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Members by gender</Card.Subtitle>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={memberData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {memberData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Funds</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Current Financial Account Balances</Card.Subtitle>
              <table className="table">
                <thead>
                  <tr>
                    <th>FUNDS</th>
                    <th>EXPENSES</th>
                    <th>AVAILABLE BAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GBP 870.00</td>
                    <td>GBP 0.00</td>
                    <td>GBP 870.00</td>
                  </tr>
                  <tr>
                    <td>USD 26,250.00</td>
                    <td>USD 0.00</td>
                    <td>USD 26,250.00</td>
                  </tr>
                  <tr>
                    <td>ZAR 32,610.00</td>
                    <td>ZAR 450.00</td>
                    <td>ZAR 32,160.00</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;