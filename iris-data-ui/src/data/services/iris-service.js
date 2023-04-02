import {getRequestData, postRequestData, putRequestData} from "../utils/data-fetch"
import { useQuery } from "@tanstack/react-query"

const IRIS_BACKEND_URL = '/api/v1/irisdata'

async function getAllIrisData() {
   return getRequestData(`${IRIS_BACKEND_URL}/all`)
}

export const useFetchAllIrisData = () => {
   return useQuery(["AllIrisData"], () => getAllIrisData())
}

export async function getIrisData(irisId) {
   return getRequestData(`${IRIS_BACKEND_URL}/single`, {id: irisId})
}

export async function addNewIris(irisData) {
   return putRequestData(`${IRIS_BACKEND_URL}/single`, irisData)
}

export async function addMultipleIris(multipleIrisData) {
   return postRequestData(`${IRIS_BACKEND_URL}/multiple`, multipleIrisData)
}

export async function getTrainningData() {
   return getRequestData(`${IRIS_BACKEND_URL}/training`)
}

export async function getValidationData() {
   return getRequestData(`${IRIS_BACKEND_URL}/validation`)
}

export async function seedData() {
   return putRequestData(`${IRIS_BACKEND_URL}/seed`)
}