<script>
    import fetchLanguages from 'lib/data/languages';
    import Page from 'components/common/Page';
    
    import fetchData from 'lib/data/fetch';
    import {rewriteData} from 'lib/data/utils';
    import Body from 'components/common/Body';
    const id = (new URLSearchParams(window.location.search)).get('id');
    if (!id) window.location.href = '/languages';
</script>
<Page>
    <div class="gutter flexbox spread">
        <div class="main">
            {#await fetchData(`/modelling-languages/${id}`, true).then(r => rewriteData(r))}
                <h1>Loading...</h1>
            {:then language}
                <div class="flexbox spread center">
                    <h1>{language.name}</h1>
                    {#if language.paper}
                    <a href={language.paper} class="btn-accent-1">Paper</a>
                    {/if}
                </div>
                <p><b>Author</b>: {language.authors}</p>
                <p><b>Year Released</b>: {language.released.split('-')[0]}</p>
                <p class="underline">{language.description}</p>
                <Body text={language.page} />
                <p>Last Updated: {new Date(language.published_at).toLocaleString()}</p>
            {/await}
        </div>
        <div class="rightcol">
            {#await fetchLanguages()}
                <h2>Loading...</h2>
            {:then languages}
                {#each languages.slice(0, 3) as language}
                    <div class="card">
                        <h3>{language.name}</h3>
                        <p>{language.description.slice(0, 200)}...</p>
                        <a href="/language?id={language.id}" class="btn-accent-1">More</a>
                    </div>
                {/each}
            {/await}
        </div>
    </div>
</Page>

<style>
    .gutter {
        padding: 30px 0;
    }
    .main {
        width: 70%;
    }
    .rightcol {
        width: 25%;
    }
</style>