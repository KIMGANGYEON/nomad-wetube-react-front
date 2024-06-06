import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { joinServer, loginServer } from "../../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: number;
}

interface Data {
  title: string;
}

function Join() {
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const { isLoading, data } = useQuery<Data>("joinPage", loginServer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    reset();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        data,
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("searchKey");
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{data?.title}</h1>
      <div>{error ? <span>{error.errorMessage}</span> : null}</div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="email"
          required
          {...register("email")}
        />

        <input
          type="password"
          placeholder="password"
          required
          {...register("password", { minLength: 5 })}
        />
        {errors.password && "password big < 5"}
        <input type="submit" value="join" />
      </form>
      <hr />
      <div>
        <span>
          Don't have an account? <Link to="/join"> Create one now &rarr;</Link>
        </span>
      </div>
    </>
  );
}

export default Join;
