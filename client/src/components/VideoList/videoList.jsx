import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './videoList.css'

import { movieType, category } from '../../api/tmdbApi'
const VideoList = ({ category, id }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await tmdbApi.getVideos(category, id)
                setVideos(res.results.slice(0, 5));
            }
            catch (e) {
                console.log(e)
            }
        }

        getVideos();

    }, [category, id])

    return (
        <div className="container">
            {
                videos.map((item, i) => (
                    <Video key={i} item={item}></Video>
                ))
            }
        </div>
    )
}

const Video = props => {
    const item = props.item;
    const iframeRef = useRef(null)

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
        iframeRef.current.setAttribute("height", height);
    },[])

    return (
        <div className="video">
            <div className="video__title">
                <h2 >{item.name}</h2>
            </div>

            <iframe className="frame"
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="90%"
                title="video"
            ></iframe>

        </div>
    )
}
export default VideoList