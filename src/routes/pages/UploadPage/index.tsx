import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { backserver } from "../../../api";
import { useNavigate } from "react-router-dom";

interface Data {
  title: string;
}

function UploadPage() {
  const navigate = useNavigate();

  const [sendData, setSendData] = useState("");
  const { isLoading, data } = useQuery<Data>("uploadPage", backserver);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/videos/upload`, {
        sendData,
      });
      if (response.status === 200) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendData(e.target.value);
  };
  return (
    <>
      <h1>{data?.title}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" required placeholder="title" onChange={onChange} />
        <input type="submit" value="upload Video" />
      </form>
    </>
  );
}

export default UploadPage;
