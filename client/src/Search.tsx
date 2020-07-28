import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Search() {
  const { register, handleSubmit } = useForm();
  const [documentLinks, setDocumentLinks] = useState<any>([]); // state variable representing current links
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getDocumentLinks = async (query: any) => {
    setIsLoading(true);
    await fetch("http://localhost:8080/search", {
      method: "POST",
      mode: "cors", // or without this line
      redirect: "follow",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query), // body data type must match "Content-Type" header
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setDocumentLinks(r.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3> Search </h3>
      <Form
        inline
        onSubmit={handleSubmit(getDocumentLinks)}
        className="justify-content-center"
      >
        <Form.Control
          name="query"
          type="text"
          ref={register}
          required
        ></Form.Control>

        <Button type="submit">Search</Button>
      </Form>
      {isLoading ? (
        <p> Loading ... </p>
      ) : (
        <ul>
          {documentLinks.map((value: string) => (
            <li>
              {" "}
              <a href={value}> {value} </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
