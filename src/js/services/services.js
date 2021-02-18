const postForm = async (url, data) => {
    const response = await fetch (url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await response.json()
}

const getSources = async (url) => {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not get sources right. Status: ${result.status}`);
    }

    return await result.json()

    // getSources('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuItem(img, altimg, title, descr, price).create(container);
    //     })
    // })
}

export {postForm, getSources};