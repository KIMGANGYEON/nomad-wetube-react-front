import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Video {
  title: string;
  views: number;
  createdAt: string;
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
  const [route, setRoute] = useState(true);

  useEffect(() => {
    if (id === undefined || !/^[0-9a-f]{24}$/.test(id)) {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(
          `http://localhost:4000/videos/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setVideo(response.data.video);
        if (response.status === 500) {
          setRoute(false);
          console.log("hello");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (id === undefined || !/^[0-9a-f]{24}$/.test(id)) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{video?.title}</title>
      </Helmet>
      {video ? (
        <div>
          <h1>{video?.title}</h1>
          <span style={{ display: "block" }}>{video?.createdAt}</span>
          <Link to="edit">
            <span>Edit video &rarr;</span>
          </Link>
          <hr />
          <Link to="delete">
            <span>Delete video &rarr;</span>
          </Link>
        </div>
      ) : (
        <h1>Video Not Found.</h1>
      )}
    </>
  );
}

export default Videos;
