import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      "Welcome to Nepal E-Mart, your one-stop shop for quality products!",
      "Discover the best deals on electronics, fashion, and more at Nepal E-Mart.",
      "Experience hassle-free shopping with Nepal E-Mart’s fast delivery service.",
      "Find everything you need from local to international brands at Nepal E-Mart.",
      "Shop with confidence at Nepal E-Mart, where customer satisfaction is our priority.",
    ],
    loop: true,
  });

  return (
    <h1>
      <span style={{ fontWeight: "bold", color: "#86469C" }}> {text}</span>
      <Cursor />
    </h1>
  );
};

export default TypeWriter;
