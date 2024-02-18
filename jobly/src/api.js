const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get list of companies. */

  static async getCompanies(searchTerm) {
    const res = searchTerm
      ? await this.request('companies', { nameLike: searchTerm })
      : await this.request('companies');

    return res.companies;
  }


  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /**  Get list of jobs. */

  static async getJobs(searchTerm) {
    const res = searchTerm
      ? await this.request('jobs', { title: searchTerm })
      : await this.request('jobs');

    return res.jobs;
  }


  /** Registers user.
   *    Makes a request for a user token and stores the token.
   *
   *  Input:  username, password, firstName, lastName, email
   */

  static async registerUser(username, password, firstName, lastName, email) {
    const data = { username, password, firstName, lastName, email };
    const res = await this.request(`auth/register`, data, "POST");
    JoblyApi.token = res.token;
    return JoblyApi.token;
  }


  /** Login user. Makes a request for a user token. Stores the
   * token to be used for future requests, and makes another request for
   * the logged in user data.
   * Returns the firstName, lastName, and email of the user.
  */

  static async loginUser(username, password) {
    const data = { username, password };
    const res = await this.request(`auth/token`, data, "POST");
    JoblyApi.token = res.token;
    return JoblyApi.token;
  }


  /** Gets user. Returns user data:
   *  {username, firstName, lastName, email, isAdmin, applications: []} */

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates user. Returns newly updated user data. */
  static async updateUser(username, userDataToUpdate) {
    const res = await this.request(
      `users/${username}`,
      userDataToUpdate,
      "PATCH");

    return res.user;
  }

  /** Applies to a job. */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
  }


}

export default JoblyApi;
