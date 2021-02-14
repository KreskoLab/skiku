<template>
<b-pagination :total="count" v-model="page" :per-page="30" range-before="3" range-after="3" order="is-centered">

    <b-pagination-button
        slot-scope="props"
        :page="props.page"
        :id="`page${props.page.number}`"
        tag="nuxt-link"
        :to="`/explore/${props.page.number}`">
        {{ (props.page.number) }}
    </b-pagination-button>

    <b-pagination-button slot="previous" slot-scope="props" :page="props.page" tag="nuxt-link" :to="`/explore/${props.page.number}`">
      <-
    </b-pagination-button>

    <b-pagination-button slot="next" slot-scope="props" :page="props.page" tag="nuxt-link" :to="`/explore/${props.page.number}`">
      ->
    </b-pagination-button>            
</b-pagination>   
</template>

<script>
export default {
  props: ['count', 'page']
}

</script>