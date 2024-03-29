import axios from 'axios';
import passwords from '../../passwords.json'

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_ASSETS = 'FETCH_ASSETS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_ASSET = 'FETCH_ASSET';
export const FETCH_PAGE = 'FETCH_PAGE';

const baseUrl = 'https://cdn.contentful.com';
const space = passwords.space;
const accessToken = passwords.accessToken;
const blogPosts = 'post';
const page = 'page';


export function fetchPosts() {
    const request = axios.get(`${baseUrl}/spaces/${space}/entries?access_token=${accessToken}&content_type=${blogPosts}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function fetchAssets() {
    const request = axios.get(`${baseUrl}/spaces/${space}/assets?access_token=${accessToken}`);
    return {
        type: FETCH_ASSETS,
        payload: request
    };
}

export function fetchAsset(id) {
    const request = axios.get(`${baseUrl}/spaces/${space}/assets/${id}?access_token=${accessToken}`);
    return {
        type: FETCH_ASSET,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${baseUrl}/spaces/${space}/entries/${id}?access_token=${accessToken}`);
    return {
        type: FETCH_POST,
        payload: request
    };
}

export function fetchPage(title) {
    const request = axios.get(`${baseUrl}/spaces/${space}/entries?access_token=${accessToken}&content_type=${page}&fields.title[match]=${title}`);
    return {
        type: FETCH_PAGE,
        payload: request
    };
}
