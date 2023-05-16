import React, { useState, useEffect } from "react";
import TrendingTile from "./TrendingTile";

const GoodreadsTrending = (props) => {
    const [trending, setTrending] = useState([])

    const getTrending = async () => {
        try {
            const response = await fetch(`/api/v1/trending`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw(error);
            }
            const trendingData = await response.json();
            setTrending(trendingData.repos);
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    };

    useEffect(() => {  
        getTrending();
    }, []);

    const trendingList = trending.slice(0, 30).map((repo) => {
        return (
            <TrendingTile
                key={repo.title}
                title={repo.title}
                author={repo.author}
                image={repo.image}
                link={repo.link}
            />
        )
    })

    return (
        <div className="primary home-box grid-x container">
            <h1 className="cell">GoodReads Trending List:</h1>
            <ul className="trending-list">
                {trendingList}
            </ul>
        </div>
    )
}

export default GoodreadsTrending;