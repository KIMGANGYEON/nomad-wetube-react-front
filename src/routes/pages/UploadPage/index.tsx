import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { backserver } from "../../../api";
import { useNavigate } from "react-router-dom";
import { spawn } from "child_process";
import { toast } from "react-toastify";

interface Data {
  title: string;
}

function UploadPage() {
  const navigate = useNavigate();

  const [sendTitle, setSendTitle] = useState("");
  const [sendDescription, setSendDescription] = useState("");
  const [sendHash, setSendHash] = useState("");
  const [errors, setErrors] = useState<any>("");
  const { isLoading, data } = useQuery<Data>("uploadPage", backserver);

  useEffect(() => {
    localStorage.removeItem("searchKey");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/videos/upload`, {
        sendTitle,
        sendDescription,
        sendHash,
      });
      if (response.status === 200) {
        toast.success("success");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data);
        console.log(errors);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendDescription(e.target.value);
  };
  const onChangeHashtags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendHash(e.target.value);
  };
  return (
    <>
      <h1>{data?.title}</h1>
      <div>{errors ? <span>{errors.errorMessage}</span> : null}</div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input type="text" required placeholder="title" onChange={onChange} />
        <input
          type="text"
          required
          placeholder="Description"
          onChange={onChangeDescription}
        />
        <input
          type="text"
          required
          placeholder="Hashtags, separated by comma.
        "
          onChange={onChangeHashtags}
        />
        <input type="submit" value="upload Video" />
      </form>
    </>
  );
}

export default UploadPage;
