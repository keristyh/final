import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";


const About = () => {
    return (
        <div className="about-page">
            <div className="post-card-detail">
                <h1>About Daily Drip Club</h1>

                <p>
                    Welcome to <strong>Daily Drip Club</strong>!
                    Your go-to community for discovering and sharing the world’s best drinks. Whether you’re a coffee
                    connoisseur, matcha lover, or tea enthusiast, here you can post your
                    latest brew, browse others’ creations, and upvote your favorites.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We believe that every sip tells a story. Our goal is to bring people
                    together around their love of drinks and spark new discoveries!
                </p>

                <h2>Key Features</h2>
                <ul>
                    <li>Create and publish your own drink posts (title, description, image).</li>
                    <li>Sort by newest or most popular to find top-rated brews.</li>
                    <li>Search by title to quickly locate your next favorite drink.</li>
                    <li>Upvote any post—unlimited times!</li>
                    <li>Comment on posts to swap tips, recipes, and stories.</li>
                    <li>Edit or delete any post you’ve created.</li>
                </ul>

                <h2>Get Involved</h2>
                <p>
                    Head over to the <a href="/">Home</a> page, hit “Create Post”
                    and share your perfect pour with the world!
                </p>
            </div>
        </div>
    )
}

export default About;
