<script>
import { Bar } from "vue-chartjs";

export default {
  name: 'BarComponent',
  extends: Bar,
  data: () => ({
    chartData: {
      labels: ["January", "February"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87797",
          data: [1, 20]
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRation: true
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style scoped>
</style>