import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Mirjana</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing photo.</p>
                    <input type="text" placeholder="Add a comment"/>
                </div>
            </div>
            <div className="card home-card">
                <h5>Mirjana</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing photo.</p>
                    <input type="text" placeholder="Add a comment"/>
                </div>
            </div>
        </div>
    );
}

export default Home;