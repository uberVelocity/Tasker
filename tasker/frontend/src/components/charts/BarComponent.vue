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
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRation: false
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style scoped>
</style>