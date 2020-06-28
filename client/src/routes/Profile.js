import React, { useEffect, useState, useContext } from "react";
import { GET } from "../util/methods";
import { UserContext } from "./../App";
const Profile = () => {
    const [myposts, setMyPosts] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        async function getData() {
            let data = await GET("/mypost");
            setMyPosts(data.posts);
        }
        getData();
    });
    return (
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
                    <h4> {state ? state.name : ""}</h4>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "18px 0px",
                            width: "108%",
                        }}
                    >
                        <h6>40 posts</h6>
                        <h6>456 followers</h6>
                        <h6>134 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {myposts.map((post) => {
                    return <img id={post._id} className="item" src={post.photo} alt={post.title} />;
                })}
            </div>
        </div>
    );
};

export default Profile;
