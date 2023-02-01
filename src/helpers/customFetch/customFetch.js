export const customFetch = async function customFetch(url) {
    let result;
    try {
        result = await fetch(url, {
            credentials: 'include',
        });
    } catch (err) {
        console.log(err);
        return {
            data: 'no data',
        };
    }

    return result.json();
};
