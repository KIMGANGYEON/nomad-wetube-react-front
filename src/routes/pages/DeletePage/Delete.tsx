import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Delete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/videos/${id}/delete`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    navigate("/");
  }, []);
  return <div>Delete</div>;
}

export default Delete;
