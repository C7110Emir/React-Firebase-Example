import React, { useContext } from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { AuthContext } from "../contexts/AuthContextProvider";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Grid className="profile">
      <Card className="profile-card">
        <Image
          src="/fire.png"
          wrapped
          ui={false}
          style={{
            maxWidth: `12rem`,
            margin: "auto",
            opacity: 0.5,
            backgroundColor: "unset",
            padding: `1rem`,
          }}
        />
        <Card.Content
          textAlign="center"
          style={{ paddingRight: `6rem`, paddingLeft: `6rem` }}
        >
          <Card.Header style={{ fontSize: `200%` }}>
            {currentUser.displayName}
          </Card.Header>
          <br />
          <Card.Meta
            style={{
              fontSize: `150%`,
              display: "flex",
              justifyContent: "space-between",
              marginBottom: `1rem`,
            }}
          >
            <strong>User Firebase ID: </strong>
            {currentUser.uid}
          </Card.Meta>
          <Card.Description
            style={{
              fontSize: `150%`,
              display: "flex",
              justifyContent: "space-between",
              marginBottom: `1rem`,
            }}
          >
            <strong>Email: </strong>
            {currentUser.email}
          </Card.Description>{" "}
          <Card.Description
            style={{
              fontSize: `150%`,
              display: "flex",

              justifyContent: "space-between",
            }}
          >
            {" "}
            <strong>Account Created at: </strong> {currentUser.date}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid>
  );
};

export default Profile;
