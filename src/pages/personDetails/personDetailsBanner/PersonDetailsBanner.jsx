import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

//import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const PersonDetailsBanner = () => {
  const { person_id } = useParams();
  const { data, loading } = useFetch(`/person/${person_id}`);
  const { data: social, loading: loadingSocial } = useFetch(
    `/person/${person_id}/external_ids`
  );
  const { url } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);

  const toggleText = () => {
    setShow(!show);
  };

  const textArr = data?.biography?.split("\n\n");

  return (
    <div className="personalDetailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.profile_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.profile_path}
                      />
                    ) : (
                      <Img className="posterImg" src={avatar} />
                    )}
                    {!loadingSocial && (
                      <div className="socialIcons">
                        {!!social && (
                          <React.Fragment>
                            {social.facebook_id !== null && (
                              <Link
                                to={`https://facebook.com/${social.facebook_id}`}
                                target="_blank"
                              >
                                <span className="icon">
                                  <FaFacebook />
                                </span>
                              </Link>
                            )}
                            {social.twitter_id !== null && (
                              <Link to={`https://twitter.com/${social.twitter_id}`} target="_blank">
                                <span className="icon">
                                  <FaTwitter />
                                </span>
                              </Link>
                            )}
                            {social.instagram_id !== null && (
                              <Link to={`https://instagram.com/${social.instagram_id}/`} target="_blank">
                                <span className="icon">
                                  <FaInstagram />
                                </span>
                              </Link>
                            )}
                            {social.youtube_id !== null && (
                              <Link to={`https://youtube.com/${social.youtube_id}`} target="_blank">
                                <span className="icon">
                                  <FaYoutube />
                                </span>
                              </Link>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <div className="name">{`${data.name}`}</div>
                    <div className="profession">
                      {data.gender === 2 ? "Actor" : "Actress"}
                    </div>

                    <div className="biography">
                      <div className="heading">Biography</div>
                      <div className="bio">
                        <div
                          className={`full-content ${
                            show ? "show-text" : "hide-text"
                          }`}
                        >
                          <div className="description">
                            {textArr?.map((item, index) => {
                              return (
                                <p key={index} className="textSlices">
                                  {item}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        <span className="read_more_less" onClick={toggleText}>
                          {!show ? "Expand ▼ " : "Collapse ▲ "}
                        </span>
                      </div>
                    </div>

                    <div className="personal">
                      <h3>Personal Details:-</h3>
                      <div className="info">
                        {data.gender && (
                          <div className="infoItem">
                            <span className="text bold">Gender: </span>
                            <span className="text">
                              {data.gender === 1
                                ? "Female"
                                : data.gender === 2
                                ? "Male"
                                : "Transgender"}
                            </span>
                          </div>
                        )}
                        {data.birthday && (
                          <div className="infoItem">
                            <span className="text bold">Birthday: </span>
                            <span className="text">{data.birthday}</span>
                          </div>
                        )}
                        {data.place_of_birth && (
                          <div className="infoItem">
                            <span className="text bold">Place of birth: </span>
                            <span className="text">{data.place_of_birth}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="personalDetailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default PersonDetailsBanner;
