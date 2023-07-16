import React from "react";
import PersonDetailsBanner from "./personDetailsBanner/PersonDetailsBanner";
import Carousel from "../../components/carousel/Carousel";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const PersonDetails = () => {
  const { person_id } = useParams();
  const { data, loading } = useFetch(`/person/${person_id}/combined_credits`);
  return (
    <div>
      <PersonDetailsBanner />
      <Carousel
        title="Known For"
        data={data?.cast?.length > 20 ? data?.cast.slice(0, 20) : data?.cast}
        loading={loading}
      />
    </div>
  );
};



export default PersonDetails;
