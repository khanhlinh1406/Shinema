import React, { useEffect } from "react";
import './actor.css'

import tmdbApi from '../../api/tmdbApi'

const Actor = () => {
    useEffect(() => {
        const getActor = async () => {

            try {
                const response = await tmdbApi.credits('movie', '760926');
                console.log(response)
            } catch {
                console.log("Film slider error")
            }
        }

        getActor();

    }, []);
    return (
        <p>Actor</p>
    )
}

export default Actor