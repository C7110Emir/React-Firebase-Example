import React, { useContext, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
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
import { getSinglePost, updatePost } from "../helpers/firestore";
import { toast } from "react-toastify";

import "./pages.css";

const UpdateBlog = () => {
  const { setAllPosts } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  //const [alert, setAlert] = useState({ error: false, message: "" });

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id, null, setTitle, setContent);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > 2 && content.length > 15) {
      const info = {
        title: title,
        content: content,
      };
      updatePost(info, image, id, history, setAllPosts);
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

export default UpdateBlog;
