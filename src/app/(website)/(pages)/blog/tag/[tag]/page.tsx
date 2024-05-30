import React from "react";

const page = ({ params: { tag } }: { params: { tag: string } }) => {
  console.log(tag);

  return <section>{tag}</section>;
};

export default page;
