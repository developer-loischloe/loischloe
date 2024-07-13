import React from "react";

const JsonLd = ({ data }: { data: any }) => {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </section>
  );
};

export default JsonLd;
