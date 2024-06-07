import React, { useEffect, useState } from 'react';
import bannerImg from "../assets/banner.jpg";
import '../styles/Ideas.css';

export const Ideas = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'newest');
  const [perPage, setPerPage] = useState(parseInt(localStorage.getItem('perPage'), 10) || 10);
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage'), 10) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sortOption === 'newest' ? '-published_at' : 'published_at'}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json' 
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        setPosts(data.data); 
        setTotalPages(data.meta.last_page);
        setTotalPosts(data.meta.total)
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, perPage, sortOption]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
    localStorage.setItem('perPage', perPage.toString());
    localStorage.setItem('currentPage', currentPage.toString());
  }, [sortOption, perPage, currentPage]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); 
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pagesToShow = 5;
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>&lt;&lt;</button>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>{pageNumber}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>&gt;&gt;</button>
      </div>
    );
  };

  const formatPublishDate = (publishDateStr) => {
    const publishDate = new Date(publishDateStr);
    const day = publishDate.getDate();
    const monthIndex = publishDate.getMonth();
    const year = publishDate.getFullYear();
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };
  const renderPageInfo = () => {
    const startPostIndex = (currentPage - 1) * perPage + 1;
    const endPostIndex = Math.min(currentPage * perPage, totalPosts);
  
    return (
      <div className="page-info">
        Showing {startPostIndex}-{endPostIndex} of {totalPosts}
      </div>
    );
  };

  return (
    <section className='ideas'>
      <div className="banner">
        <img src={bannerImg} alt="Banner Img" className="banner-img" />
        <div className="banner-text">
          <h1>Ideas</h1>
          <p>Where all our great things begin</p>
        </div>
      </div>
      <div className="post-list-container">
        <div className="information-top">
          {renderPageInfo()}
          <div className="sort-and-show">
            <div className="select-wrapper">
              <label>
                Show per page:
                <select value={perPage} onChange={handlePerPageChange}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
            <div className="select-wrapper">
              <label>
                Sort By:
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="post-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ul>
              {posts.map((post) => (
                  <li key={post.id}>
                    <div className="post-card">
                      <div className="image-container">
                        <img className="post-img" src={post.medium_image[0].url} alt={post.title} loading="lazy" />
                      </div>
                      <div className="bottom">
                        <p>{formatPublishDate(post.published_at)}</p>
                        <h6>{post.title}</h6>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {totalPages > 1 && renderPagination()}
             
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Ideas;
