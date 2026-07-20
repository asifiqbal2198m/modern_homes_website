import { useEffect } from "react";

const PageMeta = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Modern Homes Interior Decor`;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = description;
  }, [title, description]);

  return null;
};

export default PageMeta;
