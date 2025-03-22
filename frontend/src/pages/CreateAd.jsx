import { useState } from "react";
// import { createAd } from "../services/adService"; // Import createAd function


const CreateAd = () => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    text: "",
    clickUrl: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form:", formData); // Debugging log
      const response = await createAd(formData);
      console.log("Response:", response);
      alert("Ad Created Successfully!");
      setFormData({ imageUrl: "", text: "", clickUrl: "" });
      setPreviewImage(null);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to create ad. Check console for errors.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Ad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
        {previewImage && <img src={previewImage} alt="Preview" className="w-full h-40 object-cover mt-2" />}

        {/* URL Input */}
        <input
          type="text"
          name="clickUrl"
          value={formData.clickUrl}
          onChange={handleChange}
          placeholder="Enter Ad URL"
          className="border p-2 w-full"
          required
        />

        {/* Text Input */}
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Enter Ad Text"
          className="border p-2 w-full"
          required
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Submit Ad
        </button>
      </form>
    </div>
  );
};

export default CreateAd;
