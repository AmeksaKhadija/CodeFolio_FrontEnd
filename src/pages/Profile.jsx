import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../api/queries";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  // ne pas passer variables si la query est `me`
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    skip: false, // ou skip: !user si tu veux attendre auth
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching profile:", error);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (!data || !data.me) return <div>No profile data found.</div>;

  return (
    <div className="profile">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>
        <strong>Name:</strong> {data.me.name}
      </p>
      <p>
        <strong>Email:</strong> {data.me.email}
      </p>
    </div>
  );
};

export default Profile;
