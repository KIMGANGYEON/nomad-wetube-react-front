import React, { useState } from "react";
import { useQuery } from "react-query";
import { searchServer } from "../../../api";
import { onChange } from "react-toastify/dist/core/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Data {
  title: string;
}

function SearchPage() {
  const { isLoading, data } = useQuery<Data>("searchPage", () =>
    searchServer(searchTitle)
  );
  const [searchTitle, setSearchTitle] = useState("d");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTitle);
    const newUrl = `/search?keyword=${searchTitle}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    // try {
    //   const response = await axios.post(`http://localhost:4000/search`, {
    //     searchTitle,
    //   });
    // } catch (error) {}
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
    </div>
  );
}

export default SearchPage;
