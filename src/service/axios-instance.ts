import axios, { AxiosResponse } from 'axios';
import { IMockConceptData } from './../models/IConcept';
import { REACT_APP_BASEURL } from '../config';

const mockSourceList = ["service1","service2","service3","service4","service5","service6","service7"]

/**
 * Axios instance
 */
export const APIclient = axios.create({
    baseURL: `${REACT_APP_BASEURL}/`
});

// Extend the response data with mock data (interceptor function)
const successHandler = (response: AxiosResponse<any>) => {
  if(typeof response.data.items === "undefined"){
    const randScore = Math.round(Math.random()*50)
    const randSource = mockSourceList[Math.round(Math.random()*(mockSourceList.length-1))]
    response.data.score = randScore
    response.data.source = randSource
    response.data = [response.data]
  }else{
    response.data.items.forEach((element:IMockConceptData) => {
      const randScore = Math.round(Math.random()*50)
      const randSource = mockSourceList[Math.round(Math.random()*(mockSourceList.length-1))]
      element.score = randScore
      element.source = randSource
    });
    // Sort by score
    response.data.items.sort((x:IMockConceptData,y:IMockConceptData)=>x.score-y.score)
  }

  return response;
};

 // Set interceptor
APIclient.interceptors.response.use(
  response => successHandler(response)
);