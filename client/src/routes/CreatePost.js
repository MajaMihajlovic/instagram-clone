import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { POST } from "./../util/methods";

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    //this is trigger?
    useEffect(async () => {
        if (url) {
            let post = await POST("/createpost", {
                title,
                body,
                url,
            });

            if (post.error) {
                M.toast({ html: post.error, classes: "#c62828 red darken-3" });
            } else {
                M.toast({ html: "Post created successfully.", classes: "#43a047 green darken-1" });
                history.push("/");
            }
        }
    }, [url]);
    async function postDetails() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "dcooom6tq");

        fetch("https://api.cloudinary.com/v1_1/dcooom6tq/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => setUrl(res.url))
            .catch((e) => console.log(e));
    }
    return (
        <div
            className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Body" onChange={(e) => setBody(e.target.value)} value={body} />
            <div className="file-field input-field">
                <div className="btn  #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={async () => {
                    await postDetails();
                }}
            >
                Submit Post
            </button>
        </div>
    );
};

export default CreatePost;
