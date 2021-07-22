import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../contexts/AuthContextProvider";

const Dashboard = () => {
  const { allPosts } = useContext(AuthContext);
  return (
    <Grid container stackable columns={3} relaxed>
      <Grid.Row style={{ paddingTop: `3rem`, paddingBottom: `3rem` }}>
        {allPosts.length > 0 &&
          allPosts.map((card, ind) => (
            <Grid.Column key={ind} style={{ paddingTop: `2rem` }}>
              <BlogCard card={card} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
