export const createAd = (locDep, locArr, dateTimeArr, minPrice, comment, item) =>
    fetch('https://handover.space/api/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            locDep,
            locArr,
            dateTimeArr,
            minPrice,
            comment,
            item,
        }),
    })
        .then((response) => {
            const { ok, status: statusCode } = response;
            return { ok, statusCode };
        })
        .catch((err) => {
            console.log(err);
        });
