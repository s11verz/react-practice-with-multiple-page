import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

  return (
    <Fragment>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
    </Fragment>
  );
}

export default HomePage;
