import fetchData from './fetch';

export default async function() {
    try {
        const languages = await fetchData('/guides', true);
        return languages.map(l => ({
            ...l,
        }));
    } catch(err) {

    }
}