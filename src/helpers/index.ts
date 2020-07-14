import axios from "axios";

export const sendRequest = async (
  method: "get" | "post" | "delete" | "patch",
  url: string,
  data?: any
) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("tid") || "",
      },
    };
    const res =
      method === "get"
        ? await axios["get"](
            `https://book-with-me-api.herokuapp.com/api/v1${url}`,
            config
          )
        : await axios["post"](
            `https://book-with-me-api.herokuapp.com/api/v1${url}`,
            data,
            config
          );
    return res.data;
  } catch (err) {
    return Promise.reject(extractApiErrors(err.response || {}));
  }
};

export const extractApiErrors = (resError: any) => {
  let errors = [{ path: "Error!", message: "Oops, something went wrong!" }];

  console.log(resError);

  if (
    resError &&
    resError.data &&
    resError.data.error &&
    resError.data.error.errors
  )
    errors = resError.data.error.errors;

  return errors;
};
