import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

import Avatar from "../../components/avatar";
import Calendly from "../../components/calendly";
import SimpleModal from "../../components/modal";
import NewsFeedCard from "../../components/newsfeed-card";
import ReviewCard from "../../components/review-card";
import { PROFILE } from "../../queries";
import { useUserContext } from "../../contexts/UserProvider";
import Button from "../../components/button";

import "./index.css";

const UserProfile = () => {
  const { id } = useParams();
  const { state } = useUserContext();

  // query data for current user
  const { data, error, loading } = useQuery(PROFILE, {
    variables: { profileUserId: id },
  });

  // if data is loading render this
  if (loading) {
    return <div>loading</div>;
  }

  // if theres an error render this
  if (error) {
    return <div>error</div>;
  }

  // current user data
  const userData = data.profile.user;

  return (
    <>
      <div className="profile-container">
        <div className="profile-left-all">
          <h1 className="profile-left">{userData.name}</h1>
          <ReviewCard />
          <div className="profile-left">{userData.pronouns}</div>
          <div className="profile-left">Business info</div>
          <SimpleModal name="Followers" />
          {state.user.id !== userData.id && (
            <Link to={`/chat/${userData.id}`}>
              <Button name="Chat" />
            </Link>
          )}
        </div>
        <div>
          <Avatar URL="https://pbs.twimg.com/profile_images/1290710495465541633/BhrDfujl_400x400.jpg" />
          <SimpleModal name="Contact Me" />
        </div>
        <div>
          <Calendly />
        </div>
      </div>
      <div className="profile-card">
        {/* <NewsFeedCard
          title="Hello"
          body="Welcome to my first post!"
          likes="5"
        /> */}
      </div>
    </>
  );
};

export default UserProfile;
