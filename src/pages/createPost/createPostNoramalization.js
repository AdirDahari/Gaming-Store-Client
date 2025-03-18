const createPostNormalization = (gameDetails, userDetails) => {

    let categoryArr = [gameDetails.cate0];
    if (gameDetails.cate1) categoryArr.push(gameDetails.cate1);
    if (gameDetails.cate2) categoryArr.push(gameDetails.cate2);

    let imagesArr = [gameDetails.url0];
    if (gameDetails.url1) imagesArr.push(gameDetails.url1);
    if (gameDetails.url2) imagesArr.push(gameDetails.url2);

    let imagesToSend = [];
    for (let i = 0; i < imagesArr.length; i++) {
        imagesToSend.push({
            url: imagesArr[i],
            alt: `${gameDetails.name} image`,
        });
    }


    return {
        platform: gameDetails.platform,
        game: {
            category: categoryArr,
            name: gameDetails.name,
            price: gameDetails.price,
            description: gameDetails.description,
            images: imagesToSend,
            productStatus: gameDetails.productStatus
        },
        seller: {
            city: userDetails.address.city,
            firstName: userDetails.name.first,
            phone: userDetails.phone
        }
    }
}

export { createPostNormalization }