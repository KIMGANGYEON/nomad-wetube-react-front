import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Video {
  title: string;
  views: number;
  description: string;
  hashtags: [];
}

interface Data {
  title: string;
  video: Video;
}
function Editvideo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [video, setVideo] = useState<Video | undefined>();
  const [span, setSpan] = useState(false);

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtags(e.target.value.split(",").map((tag) => tag.trim()));
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
        { title, description, hashtags }
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
        setDescription(response.data.video.description);
        setHashtags(response.data.video.hashtags);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {video ? (
        <div>
          <h1>Update Video</h1>
          <h2>{video?.title}</h2>
          <h4>Change Title of video</h4>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              placeholder={`Edit ${video?.title}`}
              value={title}
              onChange={handleChange1}
              required
            />
            <input
              placeholder={`Edit ${video?.description}`}
              value={description}
              onChange={handleChange2}
              required
            />
            <input
              placeholder={`Edit ${video?.hashtags}`}
              value={hashtags}
              onChange={handleChange3}
              required
            />
            <input type="submit" value="Save" />
          </form>
          {span ? <span style={{ color: "red" }}>write the title</span> : null}
        </div>
      ) : (
        <h1>Video Not Found.</h1>
      )}
    </>
  );
}

export default Editvideo;
