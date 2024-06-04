import React from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

const RichTextEditor = ({
  model,
  onModelChange,
}: {
  model: string;
  onModelChange: (content: string) => void;
}) => {
  return (
    <div>
      <FroalaEditorComponent
        model={model}
        onModelChange={onModelChange}
        tag="textarea"
        config={{
          placeholderText: "Write your blog content",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
