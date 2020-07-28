import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Search from "./Search";
import Ingest from "./Ingest";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2> Blog Searcher</h2>
        <p>
          {" "}
          Ingest multiple rss/atom feeds of different blogs and ask contextual
          questions w/ GPT-3
        </p>
      </header>
      <div>
        <Container fluid>
          <Row>
            <Col>
              <Ingest></Ingest>
            </Col>
            <Col>
              <Search></Search>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
