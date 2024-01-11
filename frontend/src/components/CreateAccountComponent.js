import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateAccountComponent = ({ createAccount }) => {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    console.log("form", form);

    const formInputs = {
      AccountType: form.accountType.value,
      StartingBalance: parseInt(form.startingBalance.value),
      LinkPhone: form.linkPhone.value,
      UserID: id,
    };
    console.log("form input", formInputs);

    try {
      const res = await createAccount(formInputs);
      console.log("res", res);
      setSuccess(true);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={2}>
            <Link to={`/balances/${id}`} className="btn btn-primary my-3">
              Go Back
            </Link>
          </Col>
        <Col md={9}>
          <h1>Open New Account</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                name="accountType"
                aria-label="Default select example"
                required
                title="Please enter account type"
              >
                <option value=""></option>
                <option value="Current">Current</option>
                <option value="Savings">Savings</option>
                <option value="Multiplier">Multiplier</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Starting Balance</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Form.Control
                  name="startingBalance"
                  required
                  type="number"
                  step="0.01"
                  title="Please enter starting balance"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Link Phone Number to this Account?</Form.Label>
              <Form.Select
                name="linkPhone"
                aria-label="Default select example"
                required
                title="Please choose yes or no"
              >
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" className="w-100" type="submit">
                Open Account
              </Button>
            </Form.Group>
            <Form.Group>
              <Alert variant="success" className="mt-3" show={success}>
                Account opened successfully
              </Alert>
            </Form.Group>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccountComponent;
