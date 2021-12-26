<template>
  <canvas ref="canvas" class="canv-chart"></canvas>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  props: {
    dataChart: {
      type: Array,
      required: true,
    },
  },
  extends: Bar,
  methods: {
    generateChart() {
      this.renderChart(
        {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: this.dataChart,
               backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(198, 255, 252 , 1)",
                "rgba(213, 245, 172, 1)",
                "rgba(245, 207, 172, 1)",
                "rgba(166, 155, 238, 1)",
                "rgba(233, 166, 198, 1)",
                "rgba(200, 118, 118, 1)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(136, 236, 230 , 1)",
                "rgba(185, 246, 107, 1)",
                "rgba(226, 153, 85, 1)",
                "rgba(109, 92, 218, 1)",
                "rgba(204, 74, 136, 1)",
                "rgba(191, 68, 68, 1)"
              ],
              borderWidth: 1,
            },
          ],
        },
        {
          legend: false,
          responsive: true,
          maintainAspectRatio: false,
        }
      );
    },
  },
  mounted: function () {
    this.generateChart();
  },
};
</script>

<style>
</style>