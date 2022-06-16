import http from '../../http';
import apiEndpoints from '../../apiEndpoints';
import * as types from './actionTypes';
import { API_KEY } from '../../contants';
import moment from 'moment';

export const setPosts = (posts) => {
  return {
    type: types.SET_POSTS,
    payload: posts,
  };
};

export const fetchPosts = (Keyword='') => {
    return (dispatch) => {
      http.get(`${apiEndpoints.posts}?api_key=${API_KEY}`)
      .then((res) => {
        if (res && res.response) {
            dispatch(setPosts(res.response.posts));
        }
      }).catch((error) => {
          console.info(error);
      })
  };
};

export const setCurrentData = (data) => {
  return {
    type: types.SET_DATA,
    payload: data,
  };
};

export const fetchData = (post='') => {
  return async (dispatch) => {

    const [mediaData, userData] = await Promise.all([http.get(`${apiEndpoints.medias}/${post.mediaId}?api_key=${API_KEY}`),
      http.get(`${apiEndpoints.users}/${post.user.username}?api_key=${API_KEY}`)]);

    const {first_name, last_name, profile_images: { small }} = userData.response.user;
    const { urls: { small: media } } = mediaData.response.media;
    const date = moment().diff(moment(post.created), 'days');

    const data = {
      profile: {
        username: `${first_name} ${last_name}`,
        image: small
      },
      image: media,
      content: {
        title: post.title,
        description: post.description,
      },
      statistics: {
        likes: post.likes
      },
      date
    };

    dispatch(setCurrentData(data));
  };
};