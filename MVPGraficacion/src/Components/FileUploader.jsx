import React from 'react';

const FileUploader = ({ onFileUpload }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <input
      type="file"
      accept=".xls,.xlsx"
      onChange={handleChange}
      className="border p-2 rounded"
    />
  );
};

export default FileUploader;
