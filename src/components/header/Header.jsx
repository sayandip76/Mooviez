import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/mooviez.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  const controlNavbar = () => {
    if(window.scrollY > 200){
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        }else{
            setShow("show");
        }
    }else{
        setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  
  useEffect(()=>{
    window.addEventListener("scroll", controlNavbar );
    return()=>{
        window.removeEventListener("scroll", controlNavbar);
    }
}, [lastScrollY])

  const navigationHandler = (type) => {
    if (type === "movie")
        navigate("/explore/movie");
    else
        navigate("/explore/tv");
    setMobileMenu(false);
  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      window.location.reload();
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="mobileMenuItems">
        {mobileMenu ? (
          <VscChromeClose onClick={() => setMobileMenu(false)} />
        ) : (
          <SlMenu onClick={openMobileMenu} />
        )}
        </div>
        <div className="logo" onClick={()=>navigate("")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" 
          onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" 
          onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        <div className="mobileMenuItems">
        {showSearch ? (
          <VscChromeClose onClick={() => setShowSearch(false)} />
        ) : (
          <HiOutlineSearch onClick={openSearch}/>
        )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            <HiOutlineSearch onClick={()=>(query.length > 0) && 
              navigate(`/search/${query}`)}/>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
