import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Video {
  title: string;
  views: number;
}

interface Data {
  title: string;
  video: Video;
}

function Videos() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Data | null>(null);
  const [video, setVideo] = useState<Video | undefined>();

  useEffect(() => {
    if (id === undefined || !/^\d+$/.test(id)) {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(
          `http://localhost:4000/videos/${id}`
        );
        setData(response.data);
        setVideo(response.data.video);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (id === undefined || !/^\d+$/.test(id)) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{video?.title}</title>
      </Helmet>
      <div>
        <h1>{video?.title}</h1>
        <h2>
          {video?.views} {video?.views === 1 ? "view" : "views"}
        </h2>
        <Link to={`http://localhost:4000/videos/${id}/edit`}>
          <span>Edit video</span>
        </Link>
      </div>
    </>
  );
}

export default Videos;
