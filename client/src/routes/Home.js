import React, { useState, useEffect } from "react";
import { GET } from "../util/methods";

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await GET("/allpost");
            setData(response.posts);
        })();
    }, []);

    return (
        <div className="home">
            {data.map((item) => {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>
                                favourite
                            </i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="Add a comment" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
