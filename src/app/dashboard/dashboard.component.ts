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
  ConfirmedNb = -1;
  ConfirmedStr = String(this.ConfirmedNb)

  dataReceivedFromHttp: any;

  DeathTitle = 'Deaths';
  DeathNb = -1;
  DeathStr = String(this.DeathNb)


  RecoveredTitle = 'Recovered';
  RecoveredNb = -1;
  RecoveredStr = String(this.RecoveredNb)


  yearRecovered = [1, 20, 300, 400, 500, 600, 7000, 8000, 9000, 10000, 11500, 16000]
  yearDeaths = [1, 2, 30, 47, 58, 60, 75, 79, 80, 90, 169, 200]

  RecoveredInc = Math.round((this.yearRecovered[new Date().getMonth()] - this.yearRecovered[new Date().getMonth() - 1]) / this.yearRecovered[new Date().getMonth() - 1] * 100);
  RecoveredIncStr = String(this.RecoveredInc) + '%';

  DeathInc = Math.round((this.yearDeaths[new Date().getMonth()] - this.yearDeaths[new Date().getMonth() - 1]) / this.yearDeaths[new Date().getMonth() - 1] * 100);
  DeathIncStr = String(this.DeathInc) + ' %';

  posts: any;

  disp_months = ['Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan', 'Jan'];


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

      let today = new Date();
      let month: any = today.getMonth() + 1;

      let classicYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let disp_months = []

      for (let index = 0; index < 12; index++) {
        //to go leap to prev year
        if (month > 11) {
          month = 0;
        }
        disp_months.push(classicYear[month])
        month += 1;
      }


      let yearR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let yearD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


      for (let index = 0; index < Object.keys(data2).length; index++) {
        yearR[Math.floor(index / 30)] += data2[index]["NewRecovered"];// / 1000000;
        yearD[Math.floor(index / 30)] += data2[index]["NewDeaths"];// / 1000000;
      }




      //let year = [data[0]["NewRecovered"], data[1]["NewRecovered"], data[2]["NewRecovered"], data[3]["NewRecovered"], data[4]["NewRecovered"], data[5]["NewRecovered"], data[6]["NewRecovered"], data[7]["NewRecovered"], data[8]["NewRecovered"], data[9]["NewRecovered"], data[10]["NewRecovered"], data[11]["NewRecovered"]]
      this.yearRecovered = yearR.reverse();
      this.yearDeaths = yearD.reverse();
      this.disp_months = disp_months;
      console.log(this.yearRecovered);
      console.log(this.yearDeaths);
      console.log(disp_months);

    });


    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataDailySalesChart: any = {
      labels: this.disp_months,
      series: [
        this.yearRecovered
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: Math.max.apply(null, this.yearRecovered) + 1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    let dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        this.yearDeaths
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: Math.max.apply(null, this.yearDeaths) + 1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    }

    let completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    let datawebsiteViewsChart = {
      labels: ['Healed', 'Ongoing', 'Deaths'],
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
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };
    let responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 10,
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
