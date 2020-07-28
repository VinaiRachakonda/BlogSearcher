import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Ingest() {
  const { register, handleSubmit } = useForm();
  const [blogLinks, setBlogLinks] = useState<any>([]);

  const ingestBlog = async (data: any) => {
    console.log(data);
    setBlogLinks([...blogLinks, data.rss_url]);

    await fetch("http://localhost:8080/ingest", {
      method: "POST",
      mode: "cors",
      redirect: "follow",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3> Add blogs here</h3>
      <Form
        inline
        onSubmit={handleSubmit(ingestBlog)}
        className="justify-content-center"
      >
        <Form.Control
          name="rss_url"
          type="text"
          ref={register}
          required
        ></Form.Control>

        <Button type="submit">Ingest</Button>
      </Form>

      <ul>
        {blogLinks.map((value: string) => (
          <li>
            {" "}
            <a href={value}> {value} </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingest;
