import { APIclient } from "./axios-instance";

export const search = (query = "", limit = 50, offset = 0) => {
    const fullQuery = `${process.env.REACT_APP_EDITION}/${process.env.REACT_APP_VERSION}/concepts?term=${encodeURIComponent(query)}&activeFilter=true&offset=${offset}&limit=${limit}`
    return APIclient.get(fullQuery)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}