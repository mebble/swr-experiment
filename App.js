import React from 'react';
import useSWR from 'swr';

const App = () => {
    const { data: posts, error } = useSWR('http://localhost:3000/posts', url => {
        return fetch(url).then(res => res.json())
    });
    if (error) return <p>Error!</p>;
    if (!posts) return <p>Loading...</p>;
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map(post => (
                    <li key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Author: {post.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
