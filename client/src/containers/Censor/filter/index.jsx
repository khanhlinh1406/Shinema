import React from 'react';
import './styles.css'
import { useSelector, useDispatch } from 'react-redux';
import { reviewSlice } from '../../../redux/slices/reviewSlice';

const Filter = () => {
    const data = ['All', 'Inspected', 'Inspecting', 'Uninspected']
    let dispatch = useDispatch()

    const status = useSelector(state => state.review.statusSearch)

    const filterHandle = (text) => {
        dispatch(reviewSlice.actions.updateStatusSearch(text))
    }
    return (
        <div className='listFilter'>
            {data &&
                data.map((item, i) => (
                    <p key={i} className={status == item ? 'listFilter__item listFilter__item--selected' : 'listFilter__item'} onClick={() => filterHandle(item)}>
                        {item}
                    </p>
                ))
            }
        </div>
    )
}

export default Filter
