import React, { useEffect, useState, useRef } from "react";
import { fetchImagesApi } from "./api/image.api";

const Waterfall = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetchImagesApi(page);
        setImages((prevImages) => [...prevImages, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const THRESHOLD = 100; // 滾動到底部的閾值，用於觸發載入下一頁的行為
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      console.log(container);
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - (scrollTop + clientHeight) <= THRESHOLD) {
        loadMore();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "100vh", overflowY: "scroll" }}>
      <div className="waterfall-container">
        {images.map((image) => (
          <img
            style={{ width: 400 }}
            key={image.id}
            src={image.urls.regular}
            alt={image.alt_description}
          />
        ))}
      </div>

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Waterfall;
