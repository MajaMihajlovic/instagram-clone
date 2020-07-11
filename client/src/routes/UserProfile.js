import React, { useEffect, useState, useContext } from "react";
import { GET } from "../util/methods";
import { UserContext } from "./../App";
import { useParams } from "react-router-dom";

const Profile = () => {
    const [userProfile, setUserProfile] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            let data = await GET(`/user/${id}`);
            console.log(data)
            setUserProfile(data);
        }
        if (!userProfile)
        getData();
    });
    return (
        <div>
            {!userProfile ? (
                <h5>Loading...</h5>
            ) : (
                <div>
                    <div
                        style={{
                            maxWidth: "80%",
                            margin: "0px auto",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                margin: "18px 0px",
                                borderBottom: "1px solid grey",
                            }}
                        >
                            <div>
                                <img
                                    style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                    src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                                />
                            </div>
                            <div>
                                <h4>{userProfile.user.name}</h4>
                                <h5>{userProfile.user.email}</h5>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        margin: "18px 0px",
                                        width: "108%",
                                    }}
                                >
                                    <h6>{userProfile.posts.length}</h6>
                                    <h6>456 followers</h6>
                                    <h6>134 following</h6>
                                </div>
                            </div>
                        </div>
                        <div className="gallery">
                            {userProfile.posts.map((post) => {
                                return <img id={post._id} className="item" src={post.photo} alt={post.title} />;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
