<script>
    import fetchGuides from 'lib/data/guides';
    import Page from 'components/common/Page';

    import fetchData from 'lib/data/fetch';
    import Body from 'components/common/Body';
    const id = (new URLSearchParams(window.location.search)).get('id');
    if (!id) window.location.href = '/planners';
</script>
<Page>
    <div class="gutter flexbox spread">
        <div class="main">
            {#await fetchData(`/guides/${id}`)}
                <h1>Loading...</h1>
            {:then guide}
                <div class="flexbox spread center">
                    <h1>{guide.title}</h1>
                </div>
                <p class="underline"><i>{guide.description}</i></p>
                <Body text={guide.content} />
                <p>Last Updated: {new Date(guide.published_at).toLocaleString()}</p>
            {/await}
        </div>
        <div class="rightcol">
            {#await fetchGuides()}
                <h2>Loading...</h2>
            {:then guides}
                {#each guides.slice(0, 3) as guide}
                    <div class="card">
                        <h3>{guide.title}</h3>
                        <p>{guide.description.slice(0, 200)}...</p>
                        <a href="/guide?id={guide.id}" class="btn-accent-1">More</a>
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