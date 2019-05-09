import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FinancialReportService} from 'src/app/services/financial-report/financial-report.service';
import {AlertService} from 'src/app/services/alert/alert.service';
import {LoadingController,ModalController} from '@ionic/angular';
import { Chart } from 'chart.js';
import {FinancialReportSearchModalPage} from 'src/app/User/financial-report-search-modal/financial-report-search-modal.page';
import {NotificationsService} from 'src/app/services/notifications/notifications.service';
import {NotificationsPage} from 'src/app/User/notifications/notifications.page';


@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.page.html',
  styleUrls: ['./financial-report.page.scss'],
})
export class FinancialReportPage implements OnInit {
  @ViewChild('doughnutCanvas') doughnutCanvas : ElementRef;
  doughnutChart: any;

loaded:boolean = false;
success:any;
error:any;
notification:any;
  notifications_loaded:boolean = false;
  constructor(private financialReport:FinancialReportService,
    private alert:AlertService,
    private loadingController:LoadingController,
    private modalController:ModalController,
    private notifications:NotificationsService) 
    {
      this.getNotification();
      this.getMonthlyReport();
   
     }

  ngOnInit() {
  }

  getNotification()
  {
    this.notifications_loaded = false;
    this.notifications.getUserNotificationsAvailable().then((data)=>{
      this.notifications_loaded = true;
      this.notification = data;
    })
  }


  async getMonthlyReport()
  {
    this.loaded = false;
    const loading = await this.loadingController.create({ message: 'financial loading..',spinner:'bubbles' })
    loading.present().then(()=>{
     this.financialReport.getMonthlyReport().then((data)=>{
       //console.log(data)
    this.success = data;
    console.log(this.success)
    this.loaded =true;
    loading.dismiss();
    this.loadPieChart();
     },
     error=>{
    this.error = error;
    console.log(this.error)
    this.loaded = true;
    loading.dismiss();
     }
     )
    });
    }
  

    loadPieChart()
    {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  
        type: 'doughnut',
        options: {
          responsive: true,
          maintainAspectRatio: false,
      },
        data: {
            labels: [" salary remaining in pecentage", "salary deducted in percentage"],
            
            datasets: [{
                label: '%',
                data: [this.success.data.salary_percentage_remainder, this.success.data.fine_percentage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.99)',
                    'rgba(54, 162, 235, 0.99)'
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB"
                ]
            }]
        }
  
    });
   
    
  
    }
  

   async loadFinancialReportModal()
    {
      const modal = await this.modalController.create({
        component: FinancialReportSearchModalPage,
        componentProps: {
          "Header": "Search Task",
        }
    });
  
  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      console.log('Modal Sent Data :', dataReturned);
    }
  });
  
  return await modal.present();
    }

    async SendToNotificationsModal()
    {
      const modal = await this.modalController.create({
        component: NotificationsPage,
        componentProps: {
          "Header": "Search Task",
        }
    });
  
  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      console.log('Modal Sent Data :', dataReturned);
    }
  });
  
  return await modal.present();
    }

  }


