import React, { useEffect, useState } from 'react'
import './LoginLandingPage.css';
import './SearchHistory.css';
import '../App.css';
import NavbarAuth from './NavbarAuth';
import useStore from '../state/useStore';
import { Navigate, useNavigate } from 'react-router-dom';

function SearchHistory() {
 const [searchHistory, setSearchHistory] = useState([]);
 const userInfo = useStore((state) => state.userInfo);
 console.log('userInfo:', userInfo);
 const loading = useStore((state) => state.loading);
 const setLoading = useStore((state) => state.setLoading);
 const [error , setError] = useState(null);
 const [currentPage, setCurrentPage] = useState(0);
 const [itemsPerPage, setItemsPerPage] = useState(10);
 const [totalPages, setTotalPages] = useState(0);
 const navigate = useNavigate();
 const clear = useStore((state) => state.clearState);



  useEffect(() => {
    if (userInfo === null) {
        fetch('/logout', {
            method: 'GET',
            credentials: 'same-origin',
          });
          clear();
          navigate('/');
    }
    setLoading(true);
    fetch('http://localhost:3000/query-all-routes-by-user?user_id=' + userInfo.id + '&limit=10', 
    { method: 'GET' ,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }})
      .then(response => response.json())
      .then(data => {
            setSearchHistory(data.routes)
            setCurrentPage(data.pagination.currentPage)
            setItemsPerPage(data.pagination.totalItems)
            setTotalPages(data.pagination.totalPages)
            setLoading(false);
      }
    
    )
      .catch(error => {
        console.error('Error fetching search history:', error)
         setError(error)
         setLoading(false);
        });
    
  }, [clear, navigate, setLoading, userInfo, userInfo.id])

  const paginateRoutes = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    console.log('start:', start);
    console.log('end:', end);
    console.log('searchHistory:', searchHistory.slice(start, end));
    return searchHistory.slice(start, end);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  console.log('searchHistory:', searchHistory);

  return (
    <div className="login-landing-page">
      <NavbarAuth isSearch={true} />
      <h2>Search History</h2>
   
      {loading && (
    <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' }}>
    {/* <span class="sr-only">Loading...</span> */}
  </div> 
  )}
   {!loading && (
    <>
    {error && <p>{error}</p>}
    {searchHistory.length === 0 && !error && <p>No search history found.</p>}

    
      <div classname="search-history-container">
       
      {searchHistory.length > 0 && !error && (
        <>
        <ul>
          {searchHistory.map((route,index) => (
            <li key={route.id}>
                <h2>Search # {index + 1}: </h2>
              <h3>{route.origin} to {route.destination}</h3>
            </li>
          ))}
        </ul>

        <div className="pagination-container mt-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                className={`btn btn-secondary me-2 ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
      </>

      )}
        </div>
        </> 
    )}

      </div>
  )
}

export default SearchHistory