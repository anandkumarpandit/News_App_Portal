import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createAd } from "../services/adService"; // API call function

const AdForm = () => {
  const [formData, setFormData] = useState({
    image: null, // Image file
    videoUrl: "",
    text: "", // Ad text (rich text editor)
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle text changes (rich text editor)
  const handleTextChange = (value) => {
    setFormData({ ...formData, text: value });
  };

  // Handle video URL input
  const handleVideoUrlChange = (e) => {
    setFormData({ ...formData, videoUrl: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Show preview
      setFormData({ ...formData, image: file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.image) formDataToSend.append("image", formData.image);
    formDataToSend.append("videoUrl", formData.videoUrl);
    formDataToSend.append("text", formData.text);

    try {
      console.log("Submitting Ad:", formData);
      const response = await createAd(formDataToSend);
      console.log("Response:", response);

      alert("Ad Created Successfully!");
      setFormData({ image: null, videoUrl: "", text: "" });
      setPreviewImage(null);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to create ad.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
        {previewImage && <img src={previewImage} alt="Preview" className="w-full h-40 object-cover mt-2" />}

        {/* Video URL Input */}
        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Enter Video URL"
          className="border p-2 w-full"
        />

        {/* Rich Text Editor */}
        <ReactQuill value={formData.text} onChange={handleTextChange} className="bg-white border p-2" />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Submit Ad
        </button>
      </form>
    </div>
  );
};

export default AdForm;