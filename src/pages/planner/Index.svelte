<script>
    import fetchPlanners from 'lib/data/planners';
    import Page from 'components/common/Page';

    import fetchData from 'lib/data/fetch';
    import {rewriteData} from 'lib/data/utils';
    import Body from 'components/common/Body';
    const id = (new URLSearchParams(window.location.search)).get('id');
    if (!id) window.location.href = '/planners';
</script>
<Page>
    <div class="gutter flexbox spread">
        <div class="main">
            {#await fetchData(`/planners/${id}`, true).then(r => rewriteData(r))}
                <h1>Loading...</h1>
            {:then planner}
                <div class="flexbox spread center">
                    <h1>{planner.name}</h1>
                    <div>
                        {#if planner.paper}
                            <a href={planner.paper} class="btn-accent-1">Paper</a>
                        {/if}
                        {#if planner.download_link}
                            <a href={planner.download_link} class="btn-accent-1">Download</a>
                        {/if}
                    </div>
                </div>
                <p><b>Author</b>: {planner.authors}</p>
                <p><b>Year Released</b>: {planner.released.split('-')[0]}</p>
                <p class="underline">{planner.description}</p>
                <Body text={planner.page} />
                <p>Last Updated: {new Date(planner.published_at).toLocaleString()}</p>
            {/await}
        </div>
        <div class="rightcol">
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