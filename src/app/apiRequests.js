import fetch from "isomorphic-fetch";

export const api = {};

api.get = async (endpoint) => {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    return Promise.reject(
      err.message ? "oops! something went wrong, can not get" : err.message
    );
  }
};

api.sendTo = async (endpoint, reqMethod, body) => {
  let jsonData;
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

    if (!res.ok) throw new Error(res.statusText);
    jsonData = await res.json();
    return jsonData;
  } catch (err) {
    return Promise.reject(err.message ? err.message : jsonData);
  }
};
