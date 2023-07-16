// eslint-disable-next-line no-unused-vars
import React from 'react'
import Carousel from '../../../components/carousel/Carousel';
import useFetch from "../../../hooks/useFetch";

// eslint-disable-next-line react/prop-types
const Recommendations=({mediaType,id})=>{
    // eslint-disable-next-line no-unused-vars
    const {data, loading, error}=useFetch(`/${mediaType}/${id}/recommendations`);

    return(
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    )
}

export default Recommendations