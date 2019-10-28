import { APIclient } from "./axios-instance";
import { REACT_APP_EDITION, REACT_APP_VERSION } from "../config";

// concept
export const concept = (query = "", limit = 50, offset = 0) => {
    const fullQuery = `${REACT_APP_EDITION}/${REACT_APP_VERSION}/concepts?term=${encodeURIComponent(query)}&activeFilter=true&offset=${offset}&limit=${limit}`
    return APIclient.get(fullQuery)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

// Search
export const search = (query = "") => {
    const fullQuery = `${REACT_APP_EDITION}/${REACT_APP_VERSION}/descriptions?query=${query}&searchMode=partialMatching&lang=english&statusFilter=english&skipTo=0&returnLimit=5&normalize=true&semanticFilter=finding`
    return APIclient.get(fullQuery)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}