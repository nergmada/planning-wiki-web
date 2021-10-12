import fetchData from './fetch';

export default async function() {
    try {
        const languages = await fetchData('/planners', true);
        return languages.map(l => ({
            ...l,
            paper: l.paper.length > 0 ? l.paper[0].file ? l.paper[0].file.url : l.paper[0].paper_url : null,
        }));
    } catch(err) {

    }
}

export const plannerTree = async function() {
    try {
        const planners = await fetchData('/planners');
        const reduced = planners.map(p => ({
            name: p.name,
            description: p.description,
            id: p.id,
            inspired: p.inspired.map(q => q.id),
            spawned: p.spawned.map(q => q.id),
            layer: 0
        }));
        let final = reduced;
        for (let i = 0; i < reduced.length; ++i) {
            final.forEach(p => {
                console.log(p);
                final.forEach(q => {
                    if (q.inspired.includes(p.id) || q.spawned.includes(p.id)) {
                        p.layer = q.layer + 1
                    }
                })
            });
        }
        return final;
    } catch(err) {
        return [];
    }
}