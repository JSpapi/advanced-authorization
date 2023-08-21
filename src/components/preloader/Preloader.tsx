import React from "react";
interface IProps {
  image: string;
}

export const Preloader = ({ image }: IProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={image} alt="loading" style={{ width: 250 }} />
    </div>
  );
};
