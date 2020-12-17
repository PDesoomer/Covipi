import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ICountries } from '../Countries'
import { HttpClient } from '@angular/common/http';
import { MyService } from '../services/countries-services.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataReceivedFromHttp: any;


  ConfirmedTitle = 'Confirmed Cases';
  ConfirmedNb = 100;
  DeathTitle = 'Confirmed Deaths';
  DeathNb = 100;
  RecoveredTitle = 'Recovered';
  RecoveredNb = 100;


  posts: any;


  countries: Array<ICountries> = [
    { id: 1, name: 'France', sick: 200 },
    { id: 2, name: 'Espagne', sick: 200 },
    { id: 3, name: 'Chili', sick: 200 },
    { id: 4, name: 'Guatemala', sick: 200 },
  ];


  constructor(private myService: MyService) { 

  }

  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1 $2");
    return x;
  }


  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const Title = 'Test';


    console.log(this.dataReceivedFromHttp);
    


    const dataHealedChart: any = {
      labels: ['day 1', 'T', 'W', 'T', 'F', 'S', 'Today'],
      series: [
        [190, 200, 240, 380, 300, 450, 750, 900]
      ]
    };

    const optionsHealedChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    let healedChart = new Chartist.Line('#dailySalesChart', dataHealedChart, optionsHealedChart);

    this.startAnimationForLineChart(healedChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataDeadChart: any = {
      labels: ['day 1', '3p', '6p', '9p', '12p', '3a', '6a', 'Today'],
      series: [
        [900, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsDeadChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    }

    let deadChart = new Chartist.Line('#completedTasksChart', dataDeadChart, optionsDeadChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(deadChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    let datawebsiteViewsChart = {
      labels: ['Recovered', 'Unknown', 'Deaths'],
      series: [
        [
          this.RecoveredNb / this.ConfirmedNb * 100,
          (this.ConfirmedNb - (this.DeathNb + this.RecoveredNb)) / this.ConfirmedNb * 100,
          this.DeathNb / this.ConfirmedNb * 100
        ]
      ]
    };

    let optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 101,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    let responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    let websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
