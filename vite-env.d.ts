// Define process.env for the frontend environment as we are using process.env.API_KEY
declare const process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  }
};
