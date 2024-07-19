import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setarticle] = useState({
    url: '',
    summary: '',
  });
  // Storing recent URLs
  const [allArticles, setallArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Store recent URLs in local storage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setallArticles(articlesFromLocalStorage);
    }
  }, []); // empty array so we execute at the start of the application

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setallArticles(updatedAllArticles);

      setarticle(newArticle);

      // Store URL in local storage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search bar */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img src={linkIcon} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5'/>

          <input 
            type='url' 
            placeholder='Enter a URL' 
            value={article.url} onChange={(e) => setarticle({
            ...article,
            url: e.target.value })} 
            required 
            className='url_input peer'/>
          
          {/* Focus button when we select URL box */}
          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>↲</button>
          
        </form>

        {/* Browser URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div 
              key={`link-${index}`} 
              onClick={() => setarticle(item)}
              className='link_card'>
                
              <div className='copy_btn'>
                <img src={copy} alt='copy_icon' className='w-[40%] h-[40%] object-contain'/>
              </div>

              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
              
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
    </section>
  )
}

export default Demo