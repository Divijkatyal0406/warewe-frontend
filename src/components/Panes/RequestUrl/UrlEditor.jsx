import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClock } from '@fortawesome/fontawesome-free-solid'

const requestMethods = [
  {
    slug: 'get',
    method: 'GET',
  },
  {
    slug: 'post',
    method: 'POST',
  },
  {
    slug: 'put',
    method: 'PUT',
  },
  {
    slug: 'patch',
    method: 'PATCH',
  },
  {
    slug: 'delete',
    method: 'DELETE',
  },
];

const BASE_URL = 'https://warewe-backend-sb64.onrender.com';

export default function UrlEditor({
  url,
  setUrl,
  reqMethod,
  setReqMethod,
  onInputSend,
}) {
  const [historicalRequests, setHistoricalRequests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchHistoricalRequests();
  }, []);

  const fetchHistoricalRequests = async () => {
    try {
      const response = await axios.get('https://warewe-backend-sb64.onrender.com/api/hrs');
      setHistoricalRequests(response.data);
    } catch (error) {
      console.error('Error fetching historical requests:', error);
    }
  };

  const handleDropdownClick = (selectedRequest) => {
    setUrl(BASE_URL+selectedRequest.originalUrl);
    setReqMethod(selectedRequest.method);
  };

  return (
    <>
      <form className='flex relative'>
        <select
          className='px-4 py-2 border rounded-md border-gray-300 hover:border-orange-500 focus:outline-none bg-gray-100'
          value={reqMethod}
          onChange={(e) => setReqMethod(e.target.value)}
        >
          {requestMethods.map((option) => (
            <option key={option.slug} value={option.method}>
              {option.method}
            </option>
          ))}
        </select>  
        <input
          className='ml-3 w-full px-4 py-2 border rounded-md border-gray-300 hover:border-orange-500 focus:outline-orange-500'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className='ml-3 px-6 py-2 rounded-md font-semibold text-white bg-orange-500 hover:bg-orange-600'
          type='button'
          onClick={(e) => onInputSend(e)}
        >
          Send
        </button>
        <button
            className='ml-3 px-6 py-2 rounded-md font-semibold text-white bg-orange-500 hover:bg-orange-600'
            onClick={(e) => {
              e.preventDefault();
              if(showDropdown==false) fetchHistoricalRequests(); 
              setShowDropdown(!showDropdown);
            }}
          >
            <FontAwesomeIcon icon={faClock} />
          </button>
        {showDropdown && (
          <div className='absolute right-0 mt-10 bg-white border border-gray-300 rounded-md shadow-md'>
            <p className='py-2 px-3 bg-gray-200 font-semibold'>
              Historical Requests
            </p>
            <ul>
              {historicalRequests.map((request) => (
                <li
                  key={request.id}
                  className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleDropdownClick(request)}
                >
                  {request.method} {BASE_URL}{request.originalUrl}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
}
