<script>
    import fetchLanguages from 'lib/data/languages';

    import Page from 'components/common/Page';
</script>
<Page>
    <div class="gutter">
        <h2>Languages</h2>
        <p>AI Planning divides neatly into two halves, modelling and solving. Modelling is the process of expressing the problem. Many languages exist to model planning problems. AI Planning has many languages that allow users to model problems.</p>
        <div class="flexbox">
            {#await fetchLanguages()}
                <h2>Loading...</h2>
            {:then languages}
                {#each languages as language}
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
    .flexbox {
        flex-wrap: wrap;
    }
    .card {
        padding: 0 10px;
        flex-basis: 30%;
    }
    .gutter {
        padding: 30px 0;
    }
</style>