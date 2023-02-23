function makeRequest(method, url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()

        request.open(method, url)
        request.onload = resolve
        request.onerror = reject
        request.send()
    })
}

makeRequest('GET', 'https://datatracker.ietf.org/doc/html/rfc3986#section-2.2')
    .then((event) => {
        console.log(event.target.response)
    })
    .catch((err) => {
        throw new Error(err)
    })

export default makeRequest;