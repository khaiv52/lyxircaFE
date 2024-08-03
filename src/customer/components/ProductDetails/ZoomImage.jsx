import React from "react";
import { useState } from "react";
import "./ZoomImage.css";

const ZoomImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({x, y});
  };

  return (
    <div
      className="zoom-container"    
      onMouseEnter={() => setIsZoomed(true)}
      onMouseOut={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className="zoom-image" />
      {isZoomed &&
      (
        <div
          className="zoom-overlay"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        ></div>
      )}
    </div>
  );
};

export default ZoomImage;
