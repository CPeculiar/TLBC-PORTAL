import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const auth = getAuth();
    try {
      setSuccess("Password reset instructions have been sent to your email.");
    } catch (error) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div
          className="forgot-password-card bg-dark bg-opacity-75 rounded p-4"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div className="card">
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <h3 className="card-title text-center mb-4">Forgot Password</h3>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 font-weight-bold"
                  disabled={isLoading}
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "bolder",
                    backgroundColor: "#EE5007",
                    border: "none",
                  }}
                >
                  {isLoading ? "Processing..." : "Reset Password"}
                </Button>
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="mt-3">
                    {success}
                  </Alert>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
