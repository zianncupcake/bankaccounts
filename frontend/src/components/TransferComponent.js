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

const TransferComponent = ({ transfer, getAccounts, getAccount, createTransaction }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  useEffect(() => {
    getAccount(id)
      .then((res) => {
        setAccount(res);
      })
      .catch((er) => console.log(er));

    getAccounts()
      .then((res) => {
        setAccounts(res);
      })
      .catch((er) => console.log(er));
  }, [account, accounts]);

  const goBack = () => {
    // This will go back to the previous page
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(false);
    setShowAlert2(false);
    setShowAlert3(false);
    setSuccess(false)

    const form = event.currentTarget.elements;
    console.log("form", form);
    const newBalance1 =
      parseFloat(account.StartingBalance) -
      parseFloat(form.transferAmount.value);

    if (newBalance1 < 0) {
      setShowAlert(true);
      return;
    }

    if (!accounts.some((account) => account.id === form.accountNumber.value)) {
      setShowAlert2(true);
      return;
    }
    let payeeAccount;

    try {
      payeeAccount = await getAccount(form.accountNumber.value);
      console.log("payeeaccount", payeeAccount);
    } catch (er) {
      console.log(er);
    }

    if (payeeAccount.id === id) {
      setShowAlert3(true);
      return;
    }

    const newBalance2 =
      parseFloat(payeeAccount.StartingBalance) +
      parseFloat(form.transferAmount.value);

    const PayerformInputs = {
      AccountType: account.AccountType,
      StartingBalance: newBalance1,
      LinkPhone: account.LinkPhone,
      UserID: account.UserID,
    };
    console.log("form input payer", PayerformInputs);

    const PayeeformInputs = {
      AccountType: payeeAccount.AccountType,
      StartingBalance: newBalance2,
      LinkPhone: payeeAccount.LinkPhone,
      UserID: payeeAccount.UserID,
    };
    console.log("form input payee", PayeeformInputs);

    const currentDate = new Date();
const dateString = currentDate.toString();

// Find the index of "GMT" in the string
const gmtIndex = dateString.indexOf('GMT');

// Extract the substring up to "GMT"
const formattedDate = dateString.substring(0, gmtIndex).trim();

console.log(formattedDate);


    const TransferformInputs = {
      PayerID: id,
      PayeeID: payeeAccount.id,
      TransferAmount: parseFloat(form.transferAmount.value),
      Egift: form.egift.checked,
      Message: form.message.value,
      TransactionDate: formattedDate,
    };
    console.log("form input transfer", TransferformInputs);

    try {
      const res1 = await transfer(id, PayerformInputs);
      console.log("res1", res1);
      const res2 = await transfer(payeeAccount.id, PayeeformInputs);
      console.log("res2", res2);
      const res3 = await createTransaction(TransferformInputs);
      console.log("res3", res3);

      setSuccess(true);
    } catch (er) {
      console.log(er);
    }
  };

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
              <Form.Label>Transfer Amount</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <Form.Control
                  name="transferAmount"
                  required
                  type="number"
                  step="0.01"
                />
              </div>
            </Form.Group>
            <div className="mb-3 mt-5">
              <p>
                <strong>To:</strong>
              </p>
            </div>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                name="accountNumber"
                required
                type="text"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control name="message" type="text" maxLength="255" />
            </Form.Group>
            <Form.Group className="mb-3 mt-5">
              <Form.Label>Send as E-Gift</Form.Label>
              <Form.Check
                type="checkbox"
                name="egift"
                inline
                style={{ marginLeft: '15px', opacity: 1,transform: 'scale(1.3)' }} 
                size="lg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button variant="primary" className="w-100" type="submit">
                Transfer
              </Button>
            </Form.Group>
            <Form.Group>
              <Alert variant="success" className="mt-3" show={success}>
                Successfully made a transfer
              </Alert>
            </Form.Group>
            <Alert variant="danger" className="mt-3" show={showAlert}>
              Transfer amount more than account balance
            </Alert>
            <Alert variant="dangser" className="mt-3" show={showAlert2}>
              Account number does not exist
            </Alert>
            <Alert variant="danger" className="mt-3" show={showAlert3}>
              Not allowed to send money to own account
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TransferComponent;
