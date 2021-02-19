import { baseUrl } from "./Constants";
import { useAuthContext } from "./AuthProvider";

class UserError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status: number;
}

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const createHeaders = (token?: string) => ({
  headers: new Headers(
    token
      ? {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`
        }
      : defaultHeaders
  )
});

const extractError = async (r: Response) => {
  if (r.status > 500) {
    throw new UserError(
      r.status,
      "An unexpected error has occured, please write to our support with the description and the steps to reproduce it."
    );
  }

  if (r.status === 400) {
    const error = await r.json();
    throw new UserError(error.code, error.message);
  }
  if (r.status === 403) {
    throw new UserError(r.status, "You are not allowed to see this resource!");
  }
  if (r.status === 404) {
    throw new UserError(r.status, "The resource does not exist");
  }

  const errorText = await r.text();
  throw new Error(errorText);
};

const unwrapResponse = async <TResult,>(r: Response) => {
  if (!r.ok) await extractError(r);

  const json = await r.json();
  return json as TResult;
};

const fetchNoUnwrap = async (
  token: string | undefined,
  body: any,
  path: string,
  method: string
) => {
  const headers = createHeaders(token);
  const bodyString = body ? JSON.stringify(body) : undefined;

  return fetch(baseUrl + path, {
    ...headers,
    method,
    body: bodyString
  });
};

const apiFetch = async <TResult,>(
  method: string,
  path: string,
  token?: string,
  body?: any
) => {
  const result = await fetchNoUnwrap(token, body, path, method);
  return await unwrapResponse<TResult>(result);
};

const useApi = () => {
  const { user } = useAuthContext();

  const apiGet = async <TResult,>(path: string) => {
    const token = await user?.getIdToken();
    return await apiFetch<TResult>("GET", path, token);
  };
  const apiPost = async <TResult,>(path: string, body: any) => {
    const token = await user?.getIdToken();
    return await apiFetch<TResult>("POST", path, token, body);
  };
  const apiPut = async <TResult,>(path: string, body: any) => {
    const token = await user?.getIdToken();
    return await apiFetch<TResult>("PUT", path, token, body);
  };
  const apiDelete = async <TResult,>(path: string) => {
    const token = await user?.getIdToken();
    return await apiFetch<TResult>("DELETE", path, token);
  };

  return { apiGet, apiPost, apiPut, apiDelete };
};

export { apiFetch, UserError };
export default useApi;
