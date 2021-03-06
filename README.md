![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/PDesoomer/Covipi) ![GitHub contributors](https://img.shields.io/github/contributors/PDesoomer/Covipi) ![GitHub last commit](https://img.shields.io/github/last-commit/PDesoomer/Covipi)



# Covipi
An elegant web interface to follow the cases of ```COVID-19``` worldwide.
<br>
[DESOOMER](https://github.com/PDesoomer) & [BERNARD](https://github.com/GBernard314) ® .

  <img alt="Angular" src="https://img.shields.io/badge/-Angular-DD0031?logo=angular&logoColor=white"/> <img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white"/> <img alt="Material Design" src="https://img.shields.io/badge/-Material_Design-757575?logo=material-design&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white"/> <img alt="Github" src="https://img.shields.io/badge/-Github-181717?logo=github&logoColor=white"/> <img alt="VSCode" src="https://img.shields.io/badge/-VSCode-007ACC?logo=visual-studio-code&logoColor=white"/>  <img alt="PHP Storm" src="https://img.shields.io/badge/-PHPStorm-000?logo=phpstorm&logoColor=white"/>


<img src="screenshots/main_2.png" alt="dashboard">

## Description
The goal of this project is to showcase what we learned during the Angular courses we had.<br>
The requirements were : 
1. Use an API (We picked [Covid19](https://covid19api.com))
2. Have a beautiful UI (We used [Material](https://material.angular.io))

Our target was the tracking of worldwide cases of ```covid19``` by using charts and easy to understand design.

## Caution
Recently the API behaved strangely, we recommend using ```Chrome``` or to wait few seconds and refreshing the web page (especially on the table page).

## Dependencies
 - [Angular CLI](https://cli.angular.io/)
 - [NodeJs](https://nodejs.org/en)

## How to use it
First you need to download the project :
```
git clone https://github.com/PDesoomer/Covipi
```

Then you go into the directoy :
```
cd Covipi
```

You build the project :
```
npm install
```

After that you launch the ```angular server```:
```
ng serve 
```
You need to wait a bit, depending on the hardware you are running the server on, it might takes few minutes.

Meanwhile you can go to ```http://localhost:4200/``` where the server will be running.


## Screenshots
You have quick access to info by clicking on the row :
<img src="screenshots/popup.png" alt="dashboard">
### Table
<img src="screenshots/table.png" alt="dashboard">
You can sort by clicking on arrows :
<img src="screenshots/table_sorted.png" alt="dashboard">
