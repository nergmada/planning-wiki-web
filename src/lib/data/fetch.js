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

export default async function(url) {
    try {
        const { data } = await get(`${CMS_URL}${url}`);
        return data;
    } catch(err) {
        return {};
    }
}

