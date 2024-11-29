import React, { useState, useEffect } from 'react';

function Publications() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/publications.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPublications(data);
                setLoading(false);
            })
            .catch(e => {
                console.error("Failed to fetch publications:", e);
                setError("Failed to load publications. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading publications...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div id="publication-list">
            {publications.length > 0 ? (
                publications.map((pub, index) => (
                    <div key={index} className="publication card">
                        <h3>{pub.title}</h3>
                        <p>{pub.authors}</p>
                        <p>{pub.venue}, {pub.year}</p>
                        <p>Citations: {pub.citations}</p>
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">View Publication</a>
                    </div>
                ))
            ) : (
                <p>No publications found.</p>
            )}
        </div>
    );
}

export default Publications;

