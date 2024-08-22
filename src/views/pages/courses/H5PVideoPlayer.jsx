import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { H5PPlayerUI } from '@lumieducation/h5p-react';
import ReactPlayer from 'react-player';

const H5PVideoPlayer = ({ videoSrc, contentId }) => {
  const [h5pContent, setH5pContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoSrc && contentId) {
      const loadH5PContent = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/h5p/content/${contentId}`);
          setH5pContent(response.data);
        } catch (error) {
          console.error('Error loading H5P content:', error);
          setError('Error loading H5P content from server: ' + error.message);
        }
      };
      loadH5PContent();
    }
  }, [videoSrc, contentId]);

  return (
    <div>
      {videoSrc && (
        <ReactPlayer
          url={videoSrc}
          controls
          width="100%"
          height="500px"
        />
      )}
      {h5pContent && (
        <H5PPlayerUI
          id="player"
          contentId={contentId}
          loadContentCallback={async (id) => {
            try {
              const response = await axios.get(`http://localhost:8080/h5p/content/${id}`);
              return response.data;
            } catch (error) {
              console.error('Error loading H5P content:', error);
              throw error;
            }
          }}
        />
      )}
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      )}
    </div>
  );
};

export default H5PVideoPlayer;
