import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [updatePostError, setUpdatePostError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok || !data.posts || data.posts.length === 0) {
          console.log("Error fetching post:", data.message);
          setUpdatePostError("Post not found.");
          return;
        }

        console.log("Fetched Post Data:", data.posts[0]);
        setFormData(data.posts[0]); // ✅ Correctly setting post data
      } catch (error) {
        console.log("Fetch Error:", error.message);
        setUpdatePostError("Failed to fetch post.");
      }
    };

    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        toast({ title: "Please select an image!" });
        return;
      }

      setImageUploading(true);
      setImageUploadError(null);

      const uploadedFile = await uploadFile(file);
      const postImageUrl = getFilePreview(uploadedFile.$id);
      setFormData((prev) => ({ ...prev, image: postImageUrl }));

      toast({ title: "Image Uploaded Successfully!" });
      setImageUploading(false);
    } catch (error) {
      setImageUploadError("Image upload failed");
      console.log(error);
      toast({ title: "Image upload failed!" });
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;

    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." });
        setUpdatePostError(data.message);
        return;
      }

      toast({ title: "Article Updated Successfully!" });
      navigate(`/post/${data.slug}`);
    } catch (error) {
      toast({ title: "Something went wrong! Please try again." });
      setUpdatePostError("Something went wrong! Please try again.");
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  if (!formData) {
    return <p className="text-center text-lg mt-10">Loading post data...</p>;
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
        Edit Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ""}
          />

          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            value={formData.category || ""}
          >
            <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="worldnews">World News</SelectItem>
                <SelectItem value="sportsnews">Sports News</SelectItem>
                <SelectItem value="localnews">Local News</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            className="bg-slate-700"
            onClick={handleUploadImage}
          >
            {imageUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>

        {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          className="h-72 mb-12"
          modules={modules}
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content || ""}
        />

        <Button
          type="submit"
          className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md"
        >
          Update Your Article
        </Button>

        {updatePostError && <p className="text-red-600 mt-5">{updatePostError}</p>}
      </form>
    </div>
  );
};

export default EditPost;