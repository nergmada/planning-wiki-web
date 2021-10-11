import {get} from 'axios';

const CMS_URL = process.env.CMS_URL;

const recursiveRewrite = (data) => {
    if (Array.isArray(data)) return data.map(v => recursiveRewrite(v));
    if (
        typeof data === 'object' &&
        !Array.isArray(data) &&
        data !== null
    ) {
        return Object.keys(data).reduce((prev, curr) => {
            prev[curr] = curr === 'url' ? `${CMS_URL}${data[curr]}` : recursiveRewrite(data[curr]);
            return prev;
        }, {});
    }
    return data;
}

export default async function(url, rewrite = false) {
    try {
        const { data } = await get(`${CMS_URL}${url}`);
        console.log(data);
        return rewrite ? recursiveRewrite(data) : data;
    } catch(err) {
        return {};
    }
}

