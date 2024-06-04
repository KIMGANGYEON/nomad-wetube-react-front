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
    _id: number;
    rating: number;
    comments: number;
    createdAt: string;
    description: string;
    views: number;
    hashtags: any;
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
      setVideos(data?.videos);
    }
  }, [data]);
  return (
    <>
      <h1>{data?.title}</h1>
      {videos.length ? (
        <div>
          {videos?.map((video) => (
            <div key={video._id}>
              <Link to={`/videos/${video._id}`}>
                <h3>{video.title}</h3>
              </Link>
              <p>{video.description}</p>
              <ul>
                {video.hashtags.map((hash: any, index: number) => (
                  <li key={index}>{hash}</li>
                ))}
              </ul>
              <span>{video.createdAt}</span>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h2>No Video</h2>
      )}
    </>
  );
}

export default HomePage;
