"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewsGrid from "../NewsGrid";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NewsNavbar from "../NewsNavbar";
import { usePathname } from "next/navigation";

const KtmPost = () => {
  const pathname = usePathname();
  const [newses, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const toastId = toast.loading("Fetching News...");
    const getNews = async () => {
      try {
        const response = await axios.get(`/api/v1/news/ktmpost`);
        setNews(response.data.news);
        toast.success("News Loaded Successfully", { id: toastId });
      } catch (error) {
        console.error("Fetching error:", error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);
  return (
    <>
      <NewsNavbar pathname={pathname} />

      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-indigo-800">
            The Kathmandu Post
          </h1>
        </div>
      </div>
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-3xl text-gray-400 flex items-center gap-2">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : (
        <NewsGrid posts={newses} buttonLabel="Read at The Kathmandu Post" />
      )}
    </>
  );
};

export default KtmPost;
