export type ApiResponse = {
  status: "ok" | "error";
  type: string;
  message?: string;
  data?: InitResponse | IncrementResponse | DecrementResponse;
}

// type: "init""
export type InitResponse = {
  postId: string;
  count: number;
  username: string;
};

// type: "increment"
export type IncrementResponse = {
  postId: string;
  count: number;
};

// type: "decrement"
export type DecrementResponse = {
  postId: string;
  count: number;
};
