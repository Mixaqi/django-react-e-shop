export const prepareHeaders = (headers: HeadersInit = {}): HeadersInit => {
  const accessToken = localStorage.getItem('access');
  if (accessToken) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    };
  }
  return headers;
};
