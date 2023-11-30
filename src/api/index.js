import request  from "./axios";
const KEY = '792a0f0ea1f920a24882d3d1f6e2fc60'
export const getLocalCity = () => request.get(`/ip?key=${KEY}`)