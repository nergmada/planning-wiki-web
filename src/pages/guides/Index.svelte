<script>
    import fetchGuides from 'lib/data/guides';

    import Page from 'components/common/Page';
</script>
<Page>
    <div class="gutter">
        <h2>Guides</h2>
        <p>These guides help outline ideas, concepts and even concrete ways to model, solve and analyse planning problems.</p>
        <div class="flexbox spread">
            {#await fetchGuides()}
                <h2>Loading...</h2>
            {:then guides}
                {#each guides as guide}
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
    .flexbox {
        flex-wrap: wrap;
    }
    .card {
        padding: 0 10px;
        flex-basis: 33%;
    }
    .gutter {
        padding: 30px 0;
    }
</style>