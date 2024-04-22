import axios from "axios";

const Posting = async (title, content, imageFile, tags, token) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageFile", imageFile);
    formData.append("tags", tags);

    const response = await axios.post(
      "http://localhost:4000/api/v1/upload/imageUpload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Assuming you're using a Bearer token
        },
      }
    );

    console.log(response.data);
    alert("Post created successfully");
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default Posting;
