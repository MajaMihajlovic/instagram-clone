import React from 'react';

const Profile = () => {
    return (
        <div style={{
            maxWidth: "80%",
            margin: "0px auto"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img
                        style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                    />
                </div>
                <div>
                    <h4> Mirjana Mihajlovic</h4>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "18px 0px",
                        width: "108%"
                    }}>
                        <h6>40 posts</h6>
                        <h6>456 followers</h6>
                        <h6>134 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
                <img className="item" src="https://images.unsplash.com/photo-1588288335249-314f506ee38c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
</div>
        </div>
    );
}

export default Profile;