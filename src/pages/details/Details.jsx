import React from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailsBanner/Detailsbanner'
import Cast from './cast/cast'
import VideosSection from '../../components/videoSection/VideosSection';
import Similar from './carousels/Similar'
import Recommendations from './carousels/Recommendations'

const Details = () => {
  const {mediaType, id}=useParams();
  const {data, loading}=useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading}=useFetch(`/${mediaType}/${id}/credits`);
 
  const trailer=data?.results?.filter((v)=> v.type === "Trailer");
  const teaser=data?.results?.filter((v)=> v.type === "Teaser");

  return (
    <div>
      <DetailsBanner videos={trailer?.[0] || teaser?.[0] || data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} /> 
      <VideosSection data={data} loading={loading} /> 
      <Similar mediaType={mediaType} id={id}/>
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details
