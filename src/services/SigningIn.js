import axios from "axios";

const SigningIn = async (email, password) => {
  try {
    const formData = new FormData();
    // formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await axios.post(
      "http://abirr.me:4000/api/v1/login",
      formData
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export default SigningIn;
