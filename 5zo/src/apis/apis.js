import axios from "axios";

export default axios.create({
  baseURL: "http://13.124.67.187:8080/spring/api",
  headers: {
    // "Access-Control-Allow-Origin": "*"
  }
});
