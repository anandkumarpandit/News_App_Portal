import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage"
import { useState, useRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const quillRef = useRef(null)

  const [file, setFile] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({})
  const [createPostError, setCreatePostError] = useState(null)
  
  const [adImage, setAdImage] = useState(null)
  const [adURL, setAdURL] = useState("")

  const handleUploadImage = async () => {
    if (!file) {
      toast({ title: "Please select an image!" })
      return
    }

    setImageUploading(true)
    try {
      const uploadedFile = await uploadFile(file)
      const postImageUrl = getFilePreview(uploadedFile.$id)

      setFormData({ ...formData, image: postImageUrl })
      toast({ title: "Image Uploaded Successfully!" })
    } catch {
      toast({ title: "Image upload failed!" })
    }
    setImageUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({ title: "Something went wrong! Please try again." })
        setCreatePostError(data.message)
        return
      }

      toast({ title: "Article Published Successfully!" })
      navigate(`/post/${data.slug}`)
    } catch {
      toast({ title: "Something went wrong! Please try again." })
      setCreatePostError("Something went wrong! Please try again.")
    }
  }

  const handleAdImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAdImage(imageUrl)
    }
  }

  const handleAdURLChange = (e) => {
    setAdURL(e.target.value)
  }

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
  }

  return (
    <div className="p-3 max-w-5xl mx-auto min-h-screen flex">
      {/* Main Content */}
      <div className="w-3/4">
        <h1 className="text-center text-3xl my-7 font-semibold text-slate-700">
          Create a post
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <Input
              type="text"
              placeholder="Title"
              required
              id="title"
              className="w-full sm:w-3/4 h-12 border border-slate-400"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full sm:w-1/4 h-12 border border-slate-400">
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


          {/* Image Upload */}
          <div className="flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3">
            <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            <Button type="button" className="bg-slate-700" onClick={handleUploadImage}>
              {imageUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>

          {formData.image && <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />}

          <ReactQuill ref={quillRef} theme="snow" placeholder="Write something here..." className="h-72 mb-12" modules={modules} required onChange={(value) => setFormData({ ...formData, content: value })} />
          
          <Button type="submit" className="h-12 bg-green-600 font-semibold text-md">
            Publish Your Article
          </Button>
          {createPostError && <p className="text-red-600 mt-5">{createPostError}</p>}
        </form>
      </div>

      {/* Sticky Ads Section */}
      {/* <div className="w-1/4 h-full sticky top-20">
        <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Sponsored Ads</h2>
          <Input type="file" accept="image/*" onChange={handleAdImageUpload} className="mb-2" />
          <Input type="text" placeholder="Enter ad URL" value={adURL} onChange={handleAdURLChange} className="mb-2" />
          {adImage && (
            <a href={adURL || "#"} target="_blank" rel="noopener noreferrer">
              <img src={adImage} alt="Ad" className="w-full h-48 object-cover rounded-md" />
            </a>
          )}
          <p className="text-sm mt-2 text-gray-700">Upload an ad image and set a URL.</p>
        </div>
      </div> */}
    </div>
  )
}

export default CreatePost
