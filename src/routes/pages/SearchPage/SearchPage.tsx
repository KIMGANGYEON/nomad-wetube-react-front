import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchServer } from "../../../api";
import { onChange } from "react-toastify/dist/core/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Data {
  title: string;
  videos: Video[];
}

interface Video {
  title: string;
  _id: string;
  createdAt: string;
  hashtags: string[];
}

function SearchPage() {
  const [searchTitle, setSearchTitle] = useState(() => {
    return localStorage.getItem("searchKey") || "";
  });
  const { isLoading, data, refetch } = useQuery<Data>("searchPage", () =>
    searchServer(searchTitle)
  );

  useEffect(() => {
    const searchKey = localStorage.getItem("searchKey") || "";
    setSearchTitle(searchKey);
    if (searchKey) {
      const newUrl = `/search?keyword=${searchKey}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
      refetch();
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("searchKey", searchTitle);
    const newUrl = `/search?keyword=${searchTitle}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    refetch();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{data?.title}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={searchTitle}
          type="text"
          placeholder="Search by title"
        />
        <input type="submit" value="Search now" />
      </form>
      <div>
        <div>
          {data?.videos.map((video) => (
            <div key={video._id}>
              <h1>{video.title}</h1>
              <ul>
                {video.hashtags.map((hash, index) => (
                  <li key={index}>{hash}</li>
                ))}
              </ul>
              <span>{video.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
