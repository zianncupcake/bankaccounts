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
  import { Link, useNavigate, useParams} from "react-router-dom";
  import { useState, useEffect } from "react";

  
  const DepositComponent = ({ getAccount, deposit }) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [account, setAccount] = useState({})
    const [success, setSuccess] = useState(false);

useEffect(() => {
    getAccount(id)
    .then(res => {
        setAccount(res)
    })
    .catch(er => console.log(er))

}, [account])

const goBack = () => {
  // This will go back to the previous page
  navigate(-1);
};


const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    console.log("form", form);
    const newBalance = parseFloat(account.StartingBalance) + parseFloat(form.depositAmount.value)

    const formInputs = {
      AccountType: account.AccountType,
      StartingBalance: newBalance,
      LinkPhone: account.LinkPhone,
      UserID: account.UserID
      };
      console.log("form input", formInputs);

      try {
        const res = await deposit(id, formInputs)
        console.log("res", res)
        setSuccess(true)
      } catch (er) {
        console.log(er)
      }


}


  
    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={2}>
          <Button className="btn btn-primary my-3" onClick={goBack}>
              Go Back
            </Button>
          </Col>
          <Col md={9}>
          <h1>Account {account.id}</h1>

          <div className="mb-3 mt-3">
            <p>
              <strong>Exisiting Balance:</strong> {account.StartingBalance}
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>Deposit Amount</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Form.Control
                  name="depositAmount"
                  required
                  type="number"
                  step="0.01"
                  title="Please enter deposit amount"
                />
              </div>
            </Form.Group>
              <Form.Group className="mb-3">
              <Button variant="primary" className="w-100" type="submit">
                  Deposit
                </Button>
              </Form.Group>
              <Form.Group>
              <Alert variant="success" className="mt-3" show={success}>
               Successfully made a deposit
              </Alert>

              </Form.Group>



            </Form>

          </Col>
        </Row>
      </Container>
    );
  };
  
  export default DepositComponent;
  