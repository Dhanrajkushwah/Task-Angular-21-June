import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  userData: any = [];
  @ViewChild('content')
  content!: ElementRef;
  constructor(private router : Router,private service: UserserviceService) {

   }


  ngOnInit(): void {
   this.getUsers();
  }

  
//PDF download 
private generatePDF(callback: (pdf: jsPDF) => void) {
  const content = this.content.nativeElement;
  html2canvas(content).then(canvas => {
    const imgWidth = 208;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    callback(pdf);
  });
}

downloadPDF() {
  this.generatePDF((pdf) => {
    pdf.save('table.pdf');
  });
}

viewPDF() {
  this.generatePDF((pdf) => {
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  });
}


//Get Users method
  getUsers() {
    this.service.getUser().subscribe(res => {
      this.userData = res.data
      console.log("Userdata", this.userData);
    })
  }

 //Edit data 
  editusers(data: any) {
    this.router.navigate(
      ['/adduser'],
      {
        queryParams: { data: btoa(JSON.stringify(data)) }
      }
    );
  }

  // Delete Data
  deleteusers(id: any) {

    console.log(id);
        this.service.deleteUser(id).subscribe({
          next: (res:any) => {
            console.log(res);
            this.getUsers();
          },
          error: (err: any) => {
            console.log(err)
          }
          })
      }
    }
  
