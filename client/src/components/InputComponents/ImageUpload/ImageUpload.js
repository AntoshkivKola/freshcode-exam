import React from "react";
import classNames from "classnames";
import { useField } from "formik";

const ImageUpload = (props) => {
  const { setFile, name } = props;
  const [field, meta, helpers] = useField(props);

  const onChange = (e) => {
    const node = window.document.getElementById("imagePreview");

    const file = e.target.files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      e.target.value = "";
    } else {
      setFile(file);
      helpers.setValue(e.target.value);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
          name={name}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: !!field.value })}
      />
    </div>
  );
};

export default ImageUpload;