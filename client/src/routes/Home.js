import React, { useState, useEffect, useContext } from "react";
import { GET, PUT, DELETE } from "../util/methods";
import { UserContext } from "./../App";
import M from "materialize-css";

const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        (async () => {
            const response = await GET("/allpost");
            setData(response.posts);
        })();
    }, []);

    async function likePost(id) {
        let res = await PUT("/like", { postId: id });
        let newData = data.map((d) => (d._id == res._id ? res : d));
        setData(newData);
    }

    async function unlikePost(id) {
        let res = await PUT("/unlike", { postId: id });
        console.log(res);
        let newData = data.map((d) => (d._id == res._id ? res : d));
        setData(newData);
    }

    async function addComment(text, postId) {
        let res = await PUT("/comment", { text, postId });
        console.log(res);
        let newData = data.map((d) => (d._id == res._id ? res : d));
        setData(newData);
    }

    async function deletePost(postId) {
        let res = await DELETE(`/deletepost/${postId}`);
        let newData = data.filter((d) => d._id != res._id);
        setData(newData);
        M.toast({
            html: res,
            classes: "#43a047 green darken-1",
        });
    }

    return (
        <div className="home">
            {data.map((item) => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>
                            {item.postedBy.name}
                            {item.postedBy._id == state._id && (
                                <i
                                    className="material-icons"
                                    style={{ float: "right", color: "red" }}
                                    onClick={() => {
                                        deletePost(item._id);
                                    }}
                                >
                                    delete
                                </i>
                            )}
                        </h5>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content">
                            {!item.likes.includes(state._id) ? (
                                <i
                                    className="material-icons"
                                    style={{ color: "blue" }}
                                    onClick={() => {
                                        likePost(item._id);
                                    }}
                                >
                                    thumb_up
                                </i>
                            ) : (
                                <i
                                    className="material-icons"
                                    style={{ color: "grey" }}
                                    onClick={() => {
                                        unlikePost(item._id);
                                    }}
                                >
                                    thumb_down
                                </i>
                            )}
                            <h6>{item.likes.length} likes </h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {item.comments.map((comment) => {
                                return (
                                    <h6 key={comment._id}>
                                        <span style={{ fontWeight: "500" }}>
                                            {comment.postedBy.name}: {comment.text}
                                        </span>
                                    </h6>
                                );
                            })}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const text = e.target["comment"].value;
                                    addComment(text, item._id);
                                }}
                            >
                                <input type="text" id="comment" placeholder="Add a comment" />
                            </form>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
