export const rewriteData = (data) => ({
    ...data,
    paper: data.paper.length > 0 ? data.paper[0].file ? data.paper[0].file.url : data.paper[0].paper_url : null,
})