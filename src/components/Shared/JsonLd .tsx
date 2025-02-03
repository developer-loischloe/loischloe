import React from "react";

const JsonLd = ({ data }: { data: any }) => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </div>
  );
};

export default JsonLd;
