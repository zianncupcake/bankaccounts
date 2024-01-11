import { Row, Col, Table, Button, Badge, Form, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const TransactionsComponent = ({ getAccounts, getTransactions }) => {
  const { id } = useParams();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]) 
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // getTransactions()
    //   .then((res) => {
    //     //temp cuz dh api to search for userid
    //     setTransactions(
    //       res.filter(
    //         (transaction) =>
    //           transaction.PayeeID == id || transaction.PayerID == id
    //       )
    //     );
    //     console.log("transactions", res);
    //   })
    //   .catch((er) => console.log(er));

    getAccounts()
      .then((res) => {
        //temp cuz dh api to search for userid
        setAccounts(res.filter((account) => account.UserID == id));
        // console.log("accounts", res);
      })
      .catch((er) => console.log(er));
  }, [accounts]);

  const handleChange = async (e) => {
    const selectedOption = e.target.value;
    console.log("selectedoption", selectedOption)

    if (selectedOption == "") {
      return
    }

    const allAccountIDs = accounts.map((account) => account.id);

    try {
      const res = await getTransactions();
      setTransactions(res);
      if (selectedOption == "All") {
        const filteredTransactions = res.filter(
          (transaction) =>
          allAccountIDs.includes(transaction.PayeeID) ||
          allAccountIDs.includes(transaction.PayerID)
        );
        setTransactions(filteredTransactions)
        setSelectedAccounts(allAccountIDs)
  
      } else {
        console.log("transactions", res)
        const filteredTransactions = res.filter(
          (transaction) => 
          transaction.PayeeID == selectedOption || transaction.PayerID == selectedOption
        )
        console.log("filtered", filteredTransactions)
        setTransactions(filteredTransactions)
        setSelectedAccounts([selectedOption])
      }
  
      console.log("res", res)
    } catch (er) {
      console.log(er);
    }

  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={11}>
        <Row>
        <h1>My Transactions {"    "}</h1>
        </Row>
        <Row>
          <Col md={3}>
        <Form onChange={(e) => handleChange(e)} >
          <Form.Group className="mb-5 mt-3">
            <div className="input-group" >
              <div className="input-group-prepend">
                <span className="input-group-text">Filter By Account:</span>
              </div>
              <Form.Select name="account" aria-label="Default select example" >
                <option value=""></option>
                <option value="All">All</option>
                {accounts?.map((account) => (
                  <option value={account.id}>
                    {account.AccountType}: {account.id}
                  </option>
                ))}{" "}
              </Form.Select>
            </div>
          </Form.Group>
        </Form>
        </Col>
        <Col md={9}>
        </Col>
        </Row>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: "250px" }}>Sender Account Number</th>
              <th style={{ width: "250px" }}>Receiver Account Number</th>
              <th style={{ width: "150px" }}>Sent As E-Gift</th>
              <th style={{ width: "600px" }}>Message</th>
              <th>Amount</th>
              <th>Date & Time Of Transfer</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions
              .sort(
                (a, b) =>
                  new Date(b.TransactionDate) - new Date(a.TransactionDate)
              )
              .map((transaction, idx) => (
                <tr key={idx}>
                  <td>{transaction.PayerID}</td>
                  <td>{transaction.PayeeID}</td>
                  <td>{transaction.Egift ? "Yes" : "No"}</td>
                  <td>{transaction.Message}</td>
                  <td
                    style={{
                      color:  selectedAccounts.includes(transaction.PayeeID) ? "green" : "red",
                    }}
                  >
                    {transaction.TransferAmount}
                  </td>
                  <td>{transaction.TransactionDate}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default TransactionsComponent;
