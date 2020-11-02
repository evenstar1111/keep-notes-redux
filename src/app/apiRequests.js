import fetch from "isomorphic-fetch";

export const api = {};

api.get = async (endpoint) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    if (res.ok) return data;
    throw new Error(res.statusText);
  } catch (err) {
    return Promise.reject(
      err.message ? err.message : "oops! something went wrong, can not get"
    );
  }
};

api.sendTo = async (endpoint, reqMethod, body) => {
  let data;
  const method =
    reqMethod === "post" ? "POST" : reqMethod === "put" ? "PUT" : "DELETE";
  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
    if (res.ok) return data;
    throw new Error(res.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
};
