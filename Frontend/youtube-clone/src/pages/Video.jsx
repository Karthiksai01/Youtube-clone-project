import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaShare } from "react-icons/fa";

const dummyRelatedVideos = [
    { 
        id: "dQw4w9WgXcQ", 
        title: "Never Gonna Give You Up - Rick Astley", 
        channel: "Rick Astley", 
        views: "200M", 
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    },
    { 
        id: "3JZ_D3ELwOQ", 
        title: "The Evolution of Music", 
        channel: "Pentatonix", 
        views: "50M", 
        thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" 
    },
    { 
        id: "RgKAFK5djSk", 
        title: "See You Again - Wiz Khalifa ft. Charlie Puth", 
        channel: "Wiz Khalifa", 
        views: "5B", 
        thumbnail: "https://img.youtube.com/vi/RgKAFK5djSk/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk" 
    },
    { 
        id: "9bZkp7q19f0", 
        title: "Gangnam Style - PSY", 
        channel: "OfficialPSY", 
        views: "4.7B", 
        thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0" 
    },
    { 
        id: "M7FIvfx5J10", 
        title: "Bugatti Veyron vs. Fighter Jet - Top Gear", 
        channel: "Top Gear", 
        views: "100M", 
        thumbnail: "https://img.youtube.com/vi/M7FIvfx5J10/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=M7FIvfx5J10" 
    },
    { 
        id: "L_jWHffIx5E", 
        title: "In The End - Linkin Park", 
        channel: "Linkin Park", 
        views: "1.5B", 
        thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg", 
        videoUrl: "https://www.youtube.com/watch?v=L_jWHffIx5E" 
    }
];


const Video = ({ videos }) => {
    const { videoId } = useParams();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    if (!videos || videos.length === 0) {
        return <h2>Loading Videos...</h2>;
    }

    const video = videos.find(v => {
        const extractedId = v.videoUrl.split("v=")[1]?.split("&")[0];
        return extractedId === videoId;
    });

    if (!video) {
        return <h2>Video Not Found</h2>;
    }

    const toggleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setLiked(true);
            setLikeCount(likeCount + 1);
            if (disliked) {
                setDisliked(false);
                setDislikeCount(dislikeCount - 1);
            }
        }
    };

    const toggleDislike = () => {
        if (disliked) {
            setDisliked(false);
            setDislikeCount(dislikeCount - 1);
        } else {
            setDisliked(true);
            setDislikeCount(dislikeCount + 1);
            if (liked) {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        }
    };

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText("");
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    return (
        <div className="video-page-container">
            {/* Main Video Section */}
            <div className="video-content">
                <iframe
                    width="900"
                    height="500"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                <h2>{video.title}</h2>
                <p>{video.description || "No description available."}</p>

                {/* Video Actions */}
                <div className="video-actions">
                    <button onClick={toggleLike} className={liked ? "active" : ""}>
                        <FaThumbsUp /> {liked ? `Liked (${likeCount})` : `Like (${likeCount})`}
                    </button>
                    <button onClick={toggleDislike} className={disliked ? "active" : ""}>
                        <FaThumbsDown /> {disliked ? `Disliked (${dislikeCount})` : `Dislike (${dislikeCount})`}
                    </button>
                    <button onClick={handleShare}>
                        <FaShare /> Share
                    </button>
                </div>

                {/* Comment Section */}
                <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comment-input">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={handleCommentSubmit}>Post</button>
                    </div>
                    <ul className="comment-list">
                        {comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Related Videos (Right Side) */}
            <div className="related-videos">
                <h3>Related Videos</h3>
                {dummyRelatedVideos.map((vid) => (
                    <div key={vid.id} className="related-video-card">
                        <img src={vid.thumbnail} alt={vid.title} className="related-thumbnail" />
                        <div className="related-info">
                            <h4>{vid.title}</h4>
                            <p>{vid.channel}</p>
                            <p>{vid.views} views</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Video;
