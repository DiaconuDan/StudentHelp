import React from "react";
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import { Wrapper, Email, Button, Box } from "../../general/SignIn/SignIn";

const AddJob = () => (
  <Wrapper style={{ marginTop: 200 }}>
    <div>
      <Box>
        <h1>Add Job</h1>
        <form>
          <Email name="fullName" type="text" placeholder="Location" />
          <Email name="email" type="text" placeholder="Number of students" />
          <Email name="email" type="text" placeholder="Payment per hour" />
          <Email name="email" type="text" placeholder="StartDate" />
          <Email name="email" type="text" placeholder="EndDate" />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </div>
  </Wrapper>
);

const condition = authUser => authUser && authUser.role === "COMPANY";

export default compose(
  withAuthorization(condition),
  withFirebase
)(AddJob);
