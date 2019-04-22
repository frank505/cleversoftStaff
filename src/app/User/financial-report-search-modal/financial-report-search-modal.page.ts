import { Component, OnInit } from '@angular/core';
import {LoadingController,ModalController} from '@ionic/angular';
import {FinancialReportService} from 'src/app/services/financial-report/financial-report.service';
import {AlertService} from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-financial-report-search-modal',
  templateUrl: './financial-report-search-modal.page.html',
  styleUrls: ['./financial-report-search-modal.page.scss'],
})
export class FinancialReportSearchModalPage implements OnInit {
  Object = Object;
  Header:string;
  userId:any;
  UserAvailableYear:any;
public ModalSearchData = {
  month:null,
  year:null,
}

public response = {
  success:null,
  error:null,
  isLoaded:false,
  data_storage:null,
  username:null
}
  customPopoverFinancialMonthOptions: any = {
    header: 'Select Month',
    subHeader: 'Select the month for user financial history',
    message: 'the month selected above will give you full details of staffs financial details for that year',
    translucent: true
  };
  customPopOverFinancialYearOptions:any = {
    header: 'Select Year',
    subHeader: 'Select the year for user financial history',
    message: 'the year selected above will give you full details of staffs financial details for that year',
    translucent: true
  }
  constructor(private modalController:ModalController,
    private loadingController:LoadingController,
    private financialReport:FinancialReportService,
    private alert:AlertService) 
    {
      this.getAvailableUserYear();
     }

  ngOnInit() {
  }
  async closeModal()
  {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

async getAvailableUserYear()
{
  const loading = await this.loadingController.create({ message: 'financial details loading..',spinner:'bubbles' })
  loading.present().then(()=>{
  this.financialReport.getYearAvailableForUser().then((data)=>{
    this.UserAvailableYear  = data;
    this.UserAvailableYear.forEach((element,index) => {
      this.response.username = element.name;
    });
    console.log(this.response.username)
   loading.dismiss();
  },
  error=>{
    console.log(error)
    loading.dismiss();
    this.response.error = error;
       this.alert.presentAlert("error","error",this.response.error.message);
  })
});
}


async SearchForFinancialReport()
{
  if(this.ModalSearchData.month==null){
  this.alert.presentAlert("required","required field","please select a month") 
 }else if(this.ModalSearchData.year==null){
   this.alert.presentAlert("required","required field","please select a year if no year exists then user has never been punished for any crime before")
 }
  this.response.isLoaded = false;
  const loading = await this.loadingController.create({ message: 'financial details loading..',spinner:'bubbles' })
  loading.present().then(()=>{
  this.financialReport.getMonthlyReview(this.ModalSearchData.month,this.ModalSearchData.year).then((data)=>{
    console.log(data)
    loading.dismiss();
    this.response.success = data;
      this.response.isLoaded = true;
  },
  error=>{
    console.log(error)
    this.response.error= error;
     this.alert.presentAlert("error","error",this.response.error.message);
     loading.dismiss();
  })
});
}




}
