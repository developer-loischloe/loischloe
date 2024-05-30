"use client";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";

const FroalaContentView = ({ content }: { content: any }) => {
  return (
    <div className="froalaContentView">
      <FroalaEditorView model={content} />;
    </div>
  );
};

export default FroalaContentView;
