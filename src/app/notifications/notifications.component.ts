import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip
} from "ng-apexcharts";
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

export type ChartOptionsV = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  
  versionApp: string;
  versionBD: string;
  mostrar = false;

  colorOK: string = "#00ff00";
  GRAFICO_RETIROS: any;
  GRAFICO_DEPOSITO: any;
  GRAFICO_PINES: any;
  GRAFICO_BILLPAYMENT: any;

  colorMEDIO: string = "#F0ff00";
  colorERROR: string = "#F50505";
  listaCupos: any;

  valorDeposito: number;
  cupoTotalDeposito: number;
  cupoUsadoDeposito: number;
  textoDeposito: string = "";

  @ViewChild("chartDepositos") chartDepositos: ChartComponent;
  public chartOptionsDepositos: Partial<ChartOptions>;

  @ViewChild("chartDepositosV") chartDepositosV: ChartComponent;
  public chartOptionsDepositosV: Partial<ChartOptionsV>;

  valorRetiro: number;
  cupoTotalRetiro: number;
  cupoUsadoRetiro: number;
  textoRetiro: string = "";

  @ViewChild("chartRetiros") chartRetiros: ChartComponent;
  public chartOptionsRetiros: Partial<ChartOptions>;

  @ViewChild("chartRetirosV") chartRetirosV: ChartComponent;
  public chartOptionsRetirosV: Partial<ChartOptionsV>;

  valorBillPayment: number;
  cupoTotalBillPayment: number;
  cupoUsadoBillPayment: number;
  textoBillPayment: string = "";

  @ViewChild("chartBillPayment") chartBillPayment: ChartComponent;
  public chartOptionsBillPayment: Partial<ChartOptions>;

  @ViewChild("chartBillPaymentV") chartBillPaymentV: ChartComponent;
  public chartOptionsBillPaymentV: Partial<ChartOptionsV>;

  valorPines: number;
  cupoTotalPines: number;
  cupoUsadoPines: number;
  textoPines: string = "";

  @ViewChild("chartPines") chartPines: ChartComponent;
  public chartOptionsPines: Partial<ChartOptions>;

  @ViewChild("chartPinesV") chartPinesV: ChartComponent;
  public chartOptionsPinesV: Partial<ChartOptionsV>;

  constructor( private spinner: NgxSpinnerService ) {

                this.spinner.show();
    

    this.valorDeposito = 0;
    this.valorRetiro = 0;
    this.valorBillPayment = 0;
    this.valorPines = 0;

    this.chartOptionsDepositos=this.chartOption(this.valorDeposito,this.textoDeposito);
    this.chartOptionsRetiros=this.chartOption(this.valorRetiro,this.textoRetiro);
    this.chartOptionsPines=this.chartOption(this.valorPines,this.textoPines);
    this.chartOptionsBillPayment=this.chartOption(this.valorBillPayment,this.textoBillPayment);

    this.chartOptionsDepositosV=this.chartOptions([]);
    this.chartOptionsRetirosV=this.chartOptions([]);
    this.chartOptionsPinesV=this.chartOptions([]);
    this.chartOptionsBillPaymentV=this.chartOptions([]);

  }
  iniciarGraficas(){
    this.chartOptionsDepositosV=this.chartOptions(this.GRAFICO_DEPOSITO);
    this.chartOptionsRetirosV=this.chartOptions(this.GRAFICO_RETIROS);
    this.chartOptionsPinesV=this.chartOptions(this.GRAFICO_PINES);
    this.chartOptionsBillPaymentV=this.chartOptions(this.GRAFICO_BILLPAYMENT);


  }

  ngOnInit(): void {
  }

  colorDependiendoElPorcentaje( valor: number ): string {
    if ( valor >= 0 && valor <= 30 ) {
      return this.colorERROR;
    } else if ( valor > 30 && valor < 70  ) {
      return this.colorMEDIO;
    } else {
      return this.colorOK;
    }
  }

  consultaDatos(): void {

    for(let item of this.listaCupos){
      if(item.lineaNegocio=="Retiros"){
        this.cupoTotalRetiro = item.cupoGlobal;
        this.cupoUsadoRetiro = item.cupoDisponible;
      }
      if(item.lineaNegocio=="Depositos"){
        this.cupoTotalDeposito = item.cupoGlobal;
        this.cupoUsadoDeposito = item.cupoDisponible;
      }
      if(item.lineaNegocio=="BillPayment"){
        this.cupoTotalBillPayment = item.cupoGlobal;
        this.cupoUsadoBillPayment = item.cupoDisponible;
      }
      if(item.lineaNegocio=="Pines y recargas"){
        this.cupoTotalPines = item.cupoGlobal;
        this.cupoUsadoPines = item.cupoDisponible;
      }
    }


    let textoCupoTotal: string = 'Cupo total';
  
    let textoCupoDisponible: string = 'Cupo disponible';
   


    if ( this.cupoTotalDeposito ) {
      let cupoDisponible = ( this.cupoTotalDeposito - this.cupoUsadoDeposito );
      this.valorDeposito = Math.round(( cupoDisponible / this.cupoTotalDeposito ) * 100);
      this.textoDeposito = textoCupoTotal + " " + this.cupoTotalDeposito.toLocaleString() + " - " + textoCupoDisponible + " " + cupoDisponible.toLocaleString();
    }
    if ( this.cupoTotalBillPayment ) {
      let cupoDisponible = ( this.cupoTotalBillPayment - this.cupoUsadoBillPayment );
      this.valorBillPayment = Math.round(( cupoDisponible / this.cupoTotalBillPayment ) * 100);
      this.textoBillPayment = textoCupoTotal + " " + this.cupoTotalBillPayment.toLocaleString() + " - " + textoCupoDisponible + " " + cupoDisponible.toLocaleString();
    }
    if ( this.cupoTotalRetiro ) {
      let cupoDisponible = ( this.cupoTotalRetiro - this.cupoUsadoRetiro );
      this.valorRetiro = Math.round(( cupoDisponible / this.cupoTotalRetiro ) * 100);
      this.textoRetiro = textoCupoTotal + " " + this.cupoTotalRetiro.toLocaleString() + " - " + textoCupoDisponible + " " + cupoDisponible.toLocaleString();


    }
    if ( this.cupoTotalPines ) {
      let cupoDisponible = ( this.cupoTotalPines - this.cupoUsadoPines );
      this.valorPines = Math.round(( cupoDisponible / this.cupoTotalPines ) * 100);
      this.textoPines = textoCupoTotal + " " + this.cupoTotalPines.toLocaleString() + " - " + textoCupoDisponible + " " + cupoDisponible.toLocaleString();
    }

    this.chartOptionsDepositos=this.chartOption(this.valorDeposito,this.textoDeposito);
    this.chartOptionsRetiros=this.chartOption(this.valorRetiro,this.textoRetiro);
    this.chartOptionsPines=this.chartOption(this.valorPines,this.textoPines);
    this.chartOptionsBillPayment=this.chartOption(this.valorBillPayment,this.textoBillPayment);

  }
  chartOption(valorSeries,textoLabels):object{
    let chartOption= {
      series: [ valorSeries ],
      labels: [ textoLabels ],
      chart: {
        type: "radialBar",
        offsetY: -20
      },
      plotOptions: {
        radialBar: {
          startAngle: -95,
          endAngle: 95,
          hollow: {
            size: "30"
          },
          track: {
            background: "#Bfbfbf",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              fontSize: "11px",
              show: true,
              offsetY: 40,
              color: "#858796"
            },
            value: {
              offsetY: -2,
              fontSize: "14px",
              show: true
            }
          }
        }
      },
      fill: {
        colors: [ this.colorDependiendoElPorcentaje( valorSeries ) ]
      }
    };
    return chartOption;
  }


  calcularAcumulativo(arr: number[]): number[] {
    return arr.reduce((acumulado, valor) => {
      acumulado.push((acumulado.length > 0 ? acumulado[acumulado.length - 1] : 0) + valor);
      return acumulado;
    }, []);
  }
  chartOptions(data):object{
    let chartOptionsDepositos = {
      series: [

        {
          name: "DASHBOARD.FRANJA",
          type: "column",
          data: data
         },

        {
          name: "DASHBOARD.ACUMULADO",
          type: "line",
          data: this.calcularAcumulativo(data)
        }
      ],
      chart: {
        
        type: "area",
        stacked: true,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },      
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4],

      },
      xaxis: {
        categories: ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00", "11:00", "12:00", "13:00", "14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
        min: 5,
        max: 22
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              colors: "#008FFB"
            }
          },
          title: {
            text: "Ventas realizadas en una franja de horas",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              colors: "#00E396"
            }
          },
          title: {
            text: "Ventas realizadas acumuladas",
            style: {
              color: "#00E396"
            }
          }

        }
      ],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
    return chartOptionsDepositos;
  }
}
