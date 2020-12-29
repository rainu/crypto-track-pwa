<script>
  // Load speperate modules with destructure assign
  import { Pie, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: Pie,
    mixins: [reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>