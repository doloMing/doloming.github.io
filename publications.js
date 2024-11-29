'use client'

import React, { useState, useEffect } from 'react';

const publicationsData = [
  {
    "title": "Renormalization group theory for percolation in time-varying networks",
    "authors": "Yang Tian, et al.",
    "venue": "Physical Review E",
    "year": "2023",
    "citations": "5",
    "link": "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.107.024303"
  },
  {
    "title": "Percolation transition in dynamical networks: The role of temporal correlations",
    "authors": "Yang Tian, et al.",
    "venue": "Physical Review E",
    "year": "2022",
    "citations": "10",
    "link": "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.106.014307"
  },
  {
    "title": "Percolation on temporal networks",
    "authors": "Yang Tian, et al.",
    "venue": "Physical Review E",
    "year": "2021",
    "citations": "15",
    "link": "https://journals.aps.org/pre/abstract/10.1103/PhysRevE.104.024304"
  }
];

export default function Publications() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('year');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        // Simulate an async operation
        setTimeout(() => {
            setPublications(publicationsData);
            setLoading(false);
        }, 500);
    }, []);

    const sortedPublications = [...publications].sort((a, b) => {
        if (sortBy === 'year') {
            return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
        } else if (sortBy === 'citations') {
            return sortOrder === 'asc' ? a.citations - b.citations : b.citations - a.citations;
        }
        return 0;
    });

    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortOrder('desc');
        }
    };

    if (loading) {
        return <div className="loading">Loading publications...</div>;
    }

    return (
        <div id="publication-list">
            <div className="sort-controls">
                <button onClick={() => handleSort('year')} className={sortBy === 'year' ? 'active' : ''}>
                    Sort by Year {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button onClick={() => handleSort('citations')} className={sortBy === 'citations' ? 'active' : ''}>
                    Sort by Citations {sortBy === 'citations' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>
            {sortedPublications.length > 0 ? (
                sortedPublications.map((pub, index) => (
                    <div key={index} className="publication card">
                        <h3>{pub.title}</h3>
                        <p className="authors">{pub.authors}</p>
                        <p className="venue-year">
                            <span className="venue">{pub.venue}</span>
                            <span className="year">, {pub.year}</span>
                        </p>
                        <p className="citations">Citations: {pub.citations}</p>
                        <a 
                            href={pub.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="view-publication"
                        >
                            View Publication
                        </a>
                    </div>
                ))
            ) : (
                <p>No publications found.</p>
            )}
        </div>
    );
}

