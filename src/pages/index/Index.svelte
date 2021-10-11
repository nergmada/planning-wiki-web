<script>
    import fetchData from 'lib/data/fetch';
    import fetchLanguages from 'lib/data/languages';
    import fetchPlanners from 'lib/data/planners';

    import Page from 'components/common/Page';
    import Layer from 'components/common/Layer';
</script>
<Page>
    {#await fetchData('/home', true)}
        <h1>Loading...</h1>
    {:then data}
        {#if data.content.length > 0} 
            <Layer image={data.content[0].image ? data.content[0].image.url : null}>
                <h1>{data.content[0].heading}</h1>
                <p>{data.content[0].body}</p>
            </Layer>
        {/if}
        {#if data.content.length > 1}
            {#each data.content.slice(1) as layer, i}
                <Layer image={layer.image ? layer.image.url : null} reverse={i % 2 === 0}>
                    <h2>{layer.heading}</h2>
                    <p>{layer.body}</p>
                    {#if layer.action && layer.link}
                        <a class="btn-accent-1" href={layer.link}>{layer.action}</a>
                    {/if}
                </Layer>
            {/each}
        {/if}
        {/await}
    <div class="gutter">
        <h2>Languages</h2>
        <div class="flexbox spread">
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
    <div class="gutter">
        <h2>Planners</h2>
        <div class="flexbox spread">
            {#await fetchPlanners()}
                <h2>Loading...</h2>
            {:then planners}
                {#each planners.slice(0, 3) as planner}
                    <div class="card">
                        <h3>{planner.name}</h3>
                        <p>{planner.description.slice(0, 200)}...</p>
                        <a href="/planner?id={planner.id}" class="btn-accent-1">More</a>
                    </div>
                {/each}
            {/await}
        </div>
    </div>
</Page>

<style>
    .card {
        padding: 0 10px;
        flex-basis: 33%;
    }
    .gutter {
        padding: 30px 0;
    }
</style>