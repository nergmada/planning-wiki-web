import fetchData from './fetch';

export default async function() {
    try {
        const languages = await fetchData('/modelling-languages', true);
        return languages.map(l => ({
            ...l,
            paper: l.paper.length > 0 ? l.paper[0].file ? l.paper[0].file.url : l.paper[0].paper_url : null,
        }));
    } catch(err) {

    }
}