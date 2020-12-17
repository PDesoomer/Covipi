import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ICountries } from '../Countries'
import { HttpClient } from '@angular/common/http';
import { MyService } from '../services/countries-services.service';
import { config } from 'process';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ConfirmedTitle = 'Confirmed Case';
  ConfirmedNb = 0;
  ConfirmedStr = ""

  dataReceivedFromHttp: any;

  DeathTitle = 'Deaths';
  DeathNb = 0;
  DeathStr = ""


  RecoveredTitle = 'Recovered';
  RecoveredNb = 0;
  RecoveredStr = ""


  yearRecovered = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  maxRecovered = 0;

  posts: any;


  countries: Array<ICountries> = [
    { id: 1, name: 'France', sick: 200 },
    { id: 2, name: 'Espagne', sick: 200 },
    { id: 3, name: 'Chili', sick: 200 },
    { id: 4, name: 'Guatemala', sick: 200 },
  ];


  constructor(private myService: MyService) { }
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
    this.myService.getGlobalInfo().subscribe(data => {
      this.dataReceivedFromHttp = data;

      this.ConfirmedNb = data["TotalConfirmed"];
      this.ConfirmedStr = numberWithCommas(this.ConfirmedNb)
      this.DeathNb = data["TotalDeaths"];
      this.DeathStr = numberWithCommas(this.DeathNb)
      this.RecoveredNb = data["TotalRecovered"];
      this.RecoveredStr = numberWithCommas(this.RecoveredNb)
    });

    this.myService.get12LastMonths().subscribe(data2 => {

      let year = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let max = 0;

      for (let index = 0; index < data2.length; index++) {
        year[Math.floor(index / 30)] += data2[index]["NewRecovered"] / 1000000;
      }

      //this.maxRecovered = Math.max(year);        

      this.yearRecovered = year;
      console.debug(this.yearRecovered[1]);
      console.log(Math.floor(this.yearRecovered[1]));
      console.log(typeof this.yearRecovered);
      console.log("Hello");

      //console.log(data);


    });


    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataDailySalesChart: any = {
      labels: ['J'],
      series: [
        [this.yearRecovered[1]]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    let dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    let completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    let datawebsiteViewsChart = {
      labels: ['Recovered', 'Unknown', 'Dead'],
      series: [
        [this.RecoveredNb / this.ConfirmedNb * 100, (this.ConfirmedNb - (this.RecoveredNb + this.DeathNb)) / this.ConfirmedNb * 100, this.DeathNb / this.ConfirmedNb * 100]

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
