const fromServerUserNormalization = (dataFromServer) => {
    return {
        first: dataFromServer.name.first,
        middle: dataFromServer.name.middle,
        last: dataFromServer.name.last,
        phone: dataFromServer.phone,
        url: dataFromServer.image.url,
        state: dataFromServer.address.state,
        country: dataFromServer.address.country,
        city: dataFromServer.address.city,
        street: dataFromServer.address.street,
        houseNumber: dataFromServer.address.houseNumber,
        zip: dataFromServer.address.zip.toString(),
    }
}

const toServerUserNormalization = (dataToServer) => {
    return {
        address: {
            city: dataToServer.city,
            country: dataToServer.country,
            houseNumber: +dataToServer.houseNumber,
            street: dataToServer.street,
            zip: dataToServer.zip,
            state: dataToServer.state,
        },
        name: {
            first: dataToServer.first,
            middle: dataToServer.middle,
            last: dataToServer.last,
        },
        phone: dataToServer.phone,
        image: {
            url: dataToServer.url,
            alt: "Profile image"
        }
    }
}
export { fromServerUserNormalization, toServerUserNormalization }