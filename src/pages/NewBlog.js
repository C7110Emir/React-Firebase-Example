import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Grid,
  Header,
  Image,
  Segment,
  TextArea,
  Form,
  Input,
  Button,
} from "semantic-ui-react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { uploadPost } from "../helpers/firestore";
import "./pages.css";
import { toast } from "react-toastify";

const NewBlog = () => {
  const { currentUser, setAllPosts } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  //const [alert, setAlert] = useState({ error: false, message: "" });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > 2 && content.length > 15) {
      const info = {
        title: title,
        content: content,
        username: currentUser.displayName,
        userId: currentUser.uid,
      };
      uploadPost(info, image, history, setAllPosts);
    } else {
      toast.warning(
        "Title should has min 2 characters and content should has 15 chars at least! Please retry!"
      );
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" style={{ color: `#c75c5c` }} textAlign="center">
          <Image src="/fire.png" /> Upload a New Post
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              fluid
              placeholder="Title"
              type="text"
            />
            &nbsp;
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              fluid
              placeholder="Content"
            />{" "}
            &nbsp;
            <Input
              name="image"
              fluid
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Upload an Image"
              type="file"
            />
            <Button
              style={{ backgroundColor: `#c75c5c`, color: "white" }}
              fluid
              size="large"
            >
              Upload Post
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default NewBlog;

/* const initialValues = {
    title: "",
    content: "",
    image: "",
  };  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(2, "Too short")
      .max(15, "Must be 15 char or less")
      .required("Required"),
    content: Yup.string()
      .min(15, "Too short")
      .max(250, "Must be 250 char or less")
      .required("Required"),
    image: Yup.mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }); */
