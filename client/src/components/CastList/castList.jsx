import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './castList.css'
import { useNavigate } from 'react-router'
import { movieType, category } from '../../api/tmdbApi'

const CastList = ({ id, category }) => {
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            try {
                const params = {}
                const res = await tmdbApi.credits(category, id)
                setCasts(res.cast.filter(item =>
                    (item.profile_path != null)
                ))
                setCasts(res.cast.slice(0, 5))

            }
            catch (e) {
                console.log(e)
            }
        }

        getCredits();

    }, [category, id])

    const GoToPeopleDetails = (item) => {
        const navigate = useNavigate();
        navigate(`/peopleDetails/${item.id}`);
    }


    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div className="casts__item" key={i}>
                        <div className="casts__item__img"
                            style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
                            onClick={
                               ()=> GoToPeopleDetails(item)
                            }
                        >
                        </div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList