"use client";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const FroalaContentView = ({ content }: { content: any }) => {
  return <FroalaEditorView model={content} />;
};

export default FroalaContentView;
