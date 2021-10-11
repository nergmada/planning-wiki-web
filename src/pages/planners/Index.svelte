<script>
    import fetchPlanners from 'lib/data/planners';

    import Page from 'components/common/Page';
</script>
<Page>
    <div class="gutter">
        <h2>Planners</h2>
        <p>Planners solve planning problems. By reading models, and performing an algorithmic computation against them (typically some form of tree search) planners find a sequence of actions that transform the world from its initial state to a described goal state, using actions described in the model.</p>
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