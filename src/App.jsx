import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import Sidebar from './sidebar';

// Create an IPFS client instance
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [fileHashes, setFileHashes] = useState({}); // Store IPFS hashes for each file

  const handleFileUpload = async (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(newFiles);

    newFiles.forEach(async (file) => {
      setProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: 0,
      }));

      // Create a readable stream from the file
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        try {
          // Add file to IPFS
          const result = await ipfs.add(file);
          setFileHashes((prevHashes) => ({
            ...prevHashes,
            [file.name]: result.path,
          }));

          // Simulate upload progress for each file
          const uploadSimulation = setInterval(() => {
            setProgress((prevProgress) => {
              const newProgress = prevProgress[file.name] + 10;
              if (newProgress >= 100) {
                clearInterval(uploadSimulation);
              }
              return {
                ...prevProgress,
                [file.name]: Math.min(newProgress, 100),
              };
            });
          }, 200);
        } catch (error) {
          console.error('IPFS file upload error:', error);
        }
      };
    });
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center border-dashed border-4 border-blue-200 p-10 rounded-lg">
            <p className="text-gray-500 mb-4">Upload files</p>
            <div className="mb-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600"
              >
                <div className="text-xl">
                  <i className="fas fa-cloud-upload-alt text-4xl"></i>
                </div>
                <div>Drag & drop your files here</div>
                <div className="text-sm">Choose files from your computer</div>
              </label>
            </div>
          </div>
        </div>

        {/* Upload progress */}
        <div className="mt-6">
          <p className="text-gray-500">Upload progress</p>
          {files.map((file) => (
            <div key={file.name} className="mt-2">
              <p>{file.name} - IPFS Hash: {fileHashes[file.name]}</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${progress[file.name]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
