<script>
    import fetchGuides from 'lib/data/guides';

    import Page from 'components/common/Page';
</script>
<Page>
    <div class="gutter flexbox spread">
        <div class="main">
            <h1>OPTIC</h1>
        </div>
        <div class="rightcol">
            {#await fetchGuides()}
                <h2>Loading...</h2>
            {:then guides}
                {#each guides.slice(0, 3) as guide}
                    <div class="card">
                        <h3>{guide.title}</h3>
                        <p>{guide.description.slice(0, 200)}...</p>
                        <a href="/planner?id={guide.id}" class="btn-accent-1">More</a>
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