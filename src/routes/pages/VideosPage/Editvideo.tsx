import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Video {
  title: string;
  views: number;
}

interface Data {
  title: string;
  video: Video;
}
function Editvideo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [video, setVideo] = useState<Video | undefined>();
  const [span, setSpan] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "") {
      setSpan(true);

      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/videos/${id}/edit`,
        { title }
      );

      if (response.status === 200) {
        navigate(`/videos/${id}`);
      } else {
        console.error("Failed to edit video");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(
          `http://localhost:4000/videos/${id}/edit`
        );
        setData(response.data);
        setVideo(response.data.video);
        setTitle(response.data.video.title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <h1>{data?.title}</h1>
      <h4>Change Title of video</h4>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={`Edit ${video?.title}`}
          value={title}
          onChange={handleChange}
        />
        <input type="submit" value="Save" />
      </form>
      {span ? <span style={{ color: "red" }}>write the title</span> : null}
    </div>
  );
}

export default Editvideo;
