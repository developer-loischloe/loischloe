import React from "react";

const page = ({ params: { category } }: { params: { category: string } }) => {
  console.log(category);

  return <section>{category}</section>;
};

export default page;
