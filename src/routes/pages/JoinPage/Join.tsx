import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { joinServer } from "../../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  password: number;
  password2: number;
  name: string;
  location: string;
}

interface Data {
  title: string;
}

interface Error {}

function Join() {
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const { isLoading, data } = useQuery<Data>("joinPage", joinServer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    reset();
    try {
      const response = await axios.post("http://localhost:4000/join", { data });

      if (response.status === 200) {
        navigate("/login");
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
        <input type="text" placeholder="name" required {...register("name")} />

        <input
          type="email"
          placeholder="email"
          required
          {...register("email")}
        />
        <input
          type="text"
          placeholder="username"
          required
          {...register("username")}
        />
        <input
          type="password"
          placeholder="password"
          required
          {...register("password", { minLength: 5 })}
        />
        {errors.password && "password big < 5"}
        <input
          type="password"
          placeholder="Confirm Password"
          required
          {...register("password2", { minLength: 5 })}
        />
        {errors.password2 && "password big < 5"}
        <input
          type="text"
          placeholder="location"
          {...register("location", { required: true })}
        />
        {errors.location && "location is required"}
        <input type="submit" value="join" />
      </form>
      <hr />
      <div>
        <span>
          Already have an account? <Link to="/login"> Log in now &rarr;</Link>
        </span>
      </div>
    </>
  );
}

export default Join;
