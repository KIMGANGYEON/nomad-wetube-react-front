import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  interface Data {
    title: string;
    videos: [];
  }

  interface Videos {
    title: string;
    id: number;
    rating: number;
    comments: number;
    createdAt: string;
    views: number;
  }

  const [data, setData] = useState<Data | null>(null);
  const [videos, setVideos] = useState<Videos[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setVideos(data.videos);
    }
  }, [data]);

  return (
    <>
      <h1>{data?.title}</h1>
    </>
  );
}

export default HomePage;
