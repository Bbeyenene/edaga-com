// ProductDescription.jsx
import React, { useState, useRef, useLayoutEffect } from "react";

const ProductDescription = ({ description, maxLines = 3 }) => {

  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedText, setTruncatedText] = useState(""); // Holds truncated content for logging
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const maxHeight = lineHeight * maxLines; // Calculate max visible height

      // Check if content exceeds max height
      if (element.scrollHeight > maxHeight) {
        setIsTruncated(true);

        // Estimate the truncated content
        let visibleText = description;
        while (element.scrollHeight > maxHeight && visibleText.length > 0) {
          visibleText = visibleText.slice(0, -1);
          element.textContent = visibleText + "...";
        }

        setTruncatedText(visibleText.trim() + "..."); // Set truncated text
        element.textContent = description; // Reset element to original text
      } else {
        setTruncatedText(description); // No truncation needed
      }

    }
  }, [description, maxLines]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="product-description-container">
      <p
        ref={descriptionRef}
        className={`product-description ${isExpanded ? 'expanded' : ''}`}
        style={{
          display: isTruncated && !isExpanded ? "-webkit-box" : "block",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isTruncated && !isExpanded ? maxLines : "unset",
          overflow: "hidden",
        }}
      >
        {truncatedText}
      </p>
      {isTruncated && (
        <button onClick={toggleExpansion} className="toggle-description-button">
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
