import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './rightbar.css'

const Rightbar = () => {
    const [popularPosts, setPopularPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                const sortedPosts = response.data.sort((a, b) => b.likes.length - a.likes.length);
                setPopularPosts(sortedPosts.slice(0, 5)); // Display the top 5 posts
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchPopularPosts();
    }, []);

    useEffect(() => {
        const results = popularPosts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPosts(results);
    }, [search]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <aside className="page-sidebar">
            <div className="widget-holder">
                <div className="widget widget-related-post">
                    <div className="widget widget-recent-blog-post">
                        <div className="widget-title">
                            <h5>Popular Posts</h5>
                        </div>
                        <input type="text" placeholder="Search..." onChange={handleSearch} />
                        <ul>
                            {filteredPosts.map((post) => (
                                <li key={post._id}>
                                    <div className="img-holder">
                                        <figure><a href="#"><img src={post.pic} alt="#" /></a></figure>
                                    </div>
                                    <div className="text-holder">
                                        <div className="post-title">
                                            <h6><a href="blog-detail.html">{post.title}</a></h6>
                                        </div>
                                        <div className="post-options">
                                            <span><i className=" icon-clock4"></i> {new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Rightbar;
