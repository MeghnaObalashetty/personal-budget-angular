import { AfterViewInit, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements AfterViewInit {

  public dataSource:any = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#33FFFF',
            '#A033FF',
            '#33FF6F',
            '#FF5733'
        ]
    }],
    labels: []
};
constructor(private http: HttpClient,private dataService: DataService){ }

/*ngAfterViewInit(): void {
  this.http.get('http://localhost:3002/budget')
  .subscribe((res: any) =>{
    for (var i = 0; i < res.myBudgetnew.length; i++) {
      this.dataSource.datasets[0].data[i] = res.myBudgetnew[i].budget;
      this.dataSource.labels[i] = res.myBudgetnew[i].title;

  }
  this.createChart();

  });
}*/
ngAfterViewInit(): void {

  if (this.dataService.isEmpty()) {
    this.dataService.fetchData().subscribe((res: any) => {
      this.dataSource = {
        datasets: [
          {
            data: res.myBudgetnew.map((item: any) => item.budget),
          },
        ],
        labels: res.myBudgetnew.map((item: any) => item.title),
      };

      this.dataService.setData(this.dataSource);
      this.createChart();
      this.createD3js();
    });
  } else {
    this.dataSource = this.dataService.getData();
    this.createChart();
    this.createD3js();
  }
}
 createChart() {
  var ctx = document.getElementById('myChart') as HTMLCanvasElement;
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}
createD3js()
{
  const chartWidth = 400;
const chartHeight = 400;
const chartMargin = 85;
const chartRadius = Math.min(chartWidth, chartHeight) / 2 - chartMargin;

const chartSvg = d3.select("#myChart1")
  .append("svg")
  .attr("width", chartWidth)
  .attr("height", chartHeight)
  .append("g")
  .attr("transform", `translate(${chartWidth / 2},${chartHeight / 2})`);

  const chartPie = d3.pie<any>()
  .sort(null)
  .value((d) => d.data);

  const chartColor = d3.scaleOrdinal()
  .domain(this.dataSource.labels)
  .range(d3.schemeCategory10);

const chartDataReady = chartPie(
  this.dataSource.datasets[0].data.map((data: any, index: string | number) => ({
    data: data,
    label: this.dataSource.labels[index],
  }))
);

const chartArc = d3.arc()
  .innerRadius(chartRadius * 0.5)
  .outerRadius(chartRadius * 0.8);

const chartOuterArc = d3.arc()
  .innerRadius(chartRadius * 0.9)
  .outerRadius(chartRadius * 0.9);

  chartSvg
  .selectAll('chartPolylines')
  .data(chartDataReady)
  .join('polyline')
  .attr('stroke', 'black')
  .style('fill', 'none')
  .attr('stroke-width', 1)
  .attr('points', function (d: any) {
    const posA = chartArc.centroid(d as any);
    const posB = chartOuterArc.centroid(d as any);
    const posC = chartOuterArc.centroid(d as any);
    const midangle = (d as any).startAngle + ((d as any).endAngle - (d as any).startAngle) / 2;
    posC[0] = chartRadius * 0.95 * (midangle < Math.PI ? 1 : -1);
    return [posA, posB, posC].map((point: [number, number]) => point.join(',')).join(' ');
  });

chartSvg
  .selectAll('chartSlices')
  .data(chartDataReady)
  .join('path')
  .attr('d', (d: any) => (chartArc(d) as string))
  .attr('fill', (d) => String(chartColor(d.data.label)))
  .attr('stroke', 'white')
  .style('stroke-width', '2px')
  .style('opacity', 0.7);


chartSvg
  .selectAll('chartLabels')
  .data(chartDataReady)
  .join('text')
  .text((d) => d.data.label)
  .attr('transform', function (d) {
    const pos = chartOuterArc.centroid(d as any);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = chartRadius * 0.99 * (midangle < Math.PI ? 1 : -1);
    return `translate(${pos})`;
  })
  .style('text-anchor', function (d) {
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return midangle < Math.PI ? 'start' : 'end';
  });
}
}
