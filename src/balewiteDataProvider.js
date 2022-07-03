import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import Cookies from "js-cookie";
const apiUrl = `${import.meta.env.VITE_API_URL}/api`;
const countVar = "Total-Count";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
    });
  }
  options.credentials = "include";
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filters = params.filter;
    let filterQuery = "";
    for (const property in filters) {
      filterQuery += `filter[${property}]=${filters[property]}&`;
    }
    // console.log(filterQuery, filters);
    const sort = order == "ASC" ? `${field}` : `-${field}`;
    const query = {
      sort: sort,
      range: JSON.stringify([(page - 1) * perPage, page * perPage]),
    };

    const url = `${apiUrl}/${resource}?${filterQuery}&${stringify(query)}`;
    const { json } = await httpClient(url);
    // if (!headers.has(countHeader)) {
    //   throw new Error(
    //     `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
    //   );
    // }
    return {
      data: json.data,
      total: json[countVar],
    };
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json.data,
    })),

  getMany: async (resource, params) => {
    const filters = params.filter;
    let filterQuery = "";
    for (const property in filters) {
      filterQuery += `filter[${property}]=${filters[property]}&`;
    }
    const url = `${apiUrl}/${resource}?${filterQuery}`;
    const { json } = await httpClient(url);
    return { data: json.data };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filters = params.filter;
    let preFilterQuery = "";
    for (const property in filters) {
      preFilterQuery += `filter[${property}]=${filters[property]}&`;
    }
    const filterQuery = `${preFilterQuery}filter[${params.target}]=${params.id}`;
    const sort = order == "ASC" ? `${field}` : `-${field}`;
    const query = {
      sort: sort,
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      // filter: JSON.stringify({
      //     ...params.filter,
      //     [params.target]: params.id,
      // }),
    };
    const url = `${apiUrl}/${resource}?${filterQuery}&${stringify(query)}`;
    // const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { json } = await httpClient(url);
    return {
      data: json,
      total: json[countVar],
    };
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data })),

  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => json.data.id),
    })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.data.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json.data })),

  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => json.data.id),
    })),
};
