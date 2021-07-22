import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Container, Grid, Card, Icon, Image, Button } from "semantic-ui-react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { deleteSingle, getSinglePost } from "../helpers/firestore";
import { toast } from "react-toastify";

const Details = () => {
  const { currentUser, setAllPosts } = useContext(AuthContext);
  const [single, setSingle] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id, setSingle);
  }, []);
  const history = useHistory();

  const handleDelete = () => {
    if (single.userId === currentUser.uid) {
      deleteSingle(id, history, setAllPosts);
      setSingle({});
      history.push("/");
    } else {
      toast.error(
        "You don't have the permission to delete or edit! Creator ID didnt match with the current user's id " +
          currentUser.uid +
          " !== " +
          single.userId
      );
    }
  };

  const handleEdit = () => {
    if (single.userId === currentUser.uid) {
      history.push("/edit/" + id);
    } else {
      toast.error(
        "You don't have the permission to delete or edit! Creator ID didnt match with the current user's id " +
          currentUser.uid +
          " !== " +
          single.userId
      );
    }
  };

  return (
    <Container
      style={{
        paddingTop: `6rem`,
        paddingBottom: `6rem`,
        backgroundColor: `#f5cf871c`,
      }}
      fluid
    >
      <Grid centered>
        <Grid.Column width={10}>
          <Card fluid>
            <Image src={single.imageUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{single.title}</Card.Header>
              <Card.Meta>
                <span className="date">{single.username}</span>
              </Card.Meta>
              <Card.Description>{single.content}</Card.Description>
            </Card.Content>
            <Grid columns={2} verticalAlign="middle" padded>
              <Grid.Column textAlign="left">
                <Icon name="user" />
                16 Friends
              </Grid.Column>
              {currentUser.displayName && (
                <Grid.Column textAlign="right">
                  <Button color="green" onClick={handleEdit}>
                    Edit Post
                  </Button>
                  <Button color="red" onClick={handleDelete}>
                    Delete Post
                  </Button>
                </Grid.Column>
              )}
            </Grid>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Details;
