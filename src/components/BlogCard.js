import React from "react";
import { useHistory } from "react-router";
import { Card, Icon, Grid, Button, Image } from "semantic-ui-react";

const BlogCard = ({ card }) => {
  const history = useHistory();
  return (
    <Card
      style={{
        width: `25rem`,
      }}
    >
      <Image
        src={card.imageUrl || "./noimg.jpg"}
        alt="pict"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{card.title}</Card.Header>
        <Card.Meta>
          <span className="date">{card.username}</span>
        </Card.Meta>
        <Card.Description>{card.content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Icon name="heart outline" />
            16 Likes
          </Grid.Column>
          <Grid.Column>
            <Button
              color="google plus"
              onClick={() => history.push("/details/" + card.id)}
              floated="right"
            >
              See Details
            </Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default BlogCard;
