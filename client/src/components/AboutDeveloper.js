import React from "react";

const AboutDeveloper = () => {
    return (
        <div className="dev-box">
            <h1 className="about-developer-title">Tim Meehan</h1>
            <img src="https://personal-library-bucket.s3.amazonaws.com/C833CE46-35CB-4E4C-BA89-F9DBB8959F08_1_105_c.jpeg" alt="tim-meehan" className="tim-meehan"/>
            <p className="about-tim">Tim is a passionate developer with a fresh perspective and a knack for coding. With a background in hospitality, he can bring a unique blend of creativity and problem-solving skills to his projects.</p>
            <p className="about-tim">Specializing in React and Express, Tim finds joy in building intuitive and interactive web applications. Data visualization is his playground, where he transforms complex information into captivating visuals. Tim thrives on learning and constantly seeks new challenges to further hone his coding prowess.</p>
            <ul className='homepage-list'><b>Developed With Help From:</b>
                <li>Google Maps -- Geolocation, Places, React Google Maps</li>
                <li>Google Book API</li>
                <li>Open Trivia Database</li>
                <li>Goodreads</li>
                <li>Google Charts</li>
            </ul>
        </div>
    )
}

export default AboutDeveloper;
        