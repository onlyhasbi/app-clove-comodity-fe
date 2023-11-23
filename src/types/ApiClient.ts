type FetchResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export default FetchResponse;
