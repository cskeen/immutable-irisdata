import axios from 'axios'

export function getCookie(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v && v[2]
}


async function makeRequestAxiosResponse(method, URL, body, contentType, params) {
    const token = getCookie('XSRF-TOKEN')

    const config = {
        url: URL,
        method: method,
        data: body,
        params: params,
        headers: {
            'Content-Type': `${contentType}`,
            'X-XSRF-TOKEN': token,
            Accept: 'application/json'
        },
        credentials: 'same-origin'
    }

    return await axios.request(config)

}

async function makeRequestData(method, URL, body, contentType, params = null) {
    const makeResponse = await makeRequestAxiosResponse(method, URL, body, contentType, params)
    return makeResponse.data
}

export async function getRequestData(URL, params = null) {
    return makeRequestData('GET', URL, null, null, params)
}

export async function postRequestData(URL, body) {
    return makeRequestData('POST', URL, body, 'application/json')
}

export async function putRequestData(URL, body) {
    return makeRequestData('PUT', URL, body, 'application/json')
}


export async function patchRequestData(URL, body) {
    return makeRequestData('PATCH', URL, body, 'application/json')
}

export async function deleteRequestData(URL) {
    return makeRequestData('DELETE', URL, null, null)
}