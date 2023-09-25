import { AfterViewInit, Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';


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
constructor(private http: HttpClient){ }

ngAfterViewInit(): void {
  this.http.get('http://localhost:3002/budget')
  .subscribe((res: any) =>{
    for (var i = 0; i < res.myBudgetnew.length; i++) {
      this.dataSource.datasets[0].data[i] = res.myBudgetnew[i].budget;
      this.dataSource.labels[i] = res.myBudgetnew[i].title;

  }
  this.createChart();

  });
}
 createChart() {
  var ctx = document.getElementById('myChart') as HTMLCanvasElement;
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
  });
}
}
