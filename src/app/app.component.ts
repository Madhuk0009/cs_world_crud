import { Component, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  mobiles: any[] | null = null;
  formHeader = 'Add mobile';
  mobileName:any;
  price: any | null = null;
  ram: any | null = null;
  storage: any | null = null;
  showForm = false;
  id: number | null = null;

  constructor(private ms: MobileService) {}

  ngOnInit(): void {
    this.getMobiles();
  }

  getMobiles(): void {
    this.ms.fetchMobiles()
      .pipe(
        catchError((error) => {
          console.error('Error fetching mobiles:', error);
          return of(null);
        })
      )
      .subscribe((data) => {
        this.mobiles = data;
      });
  }

  deleteMobile(id: number): void {
    this.ms.deleteMobile(id).subscribe(() => {
      this.getMobiles();
    });
  }

  openForm(data: any = null): void {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.mobileName = data.name;
      this.price = data.price;
      this.ram = data.ram;
      this.storage = data.storage;
      this.id = data.id;
      this.formHeader = 'Edit Mobile';
    } else {
      this.id = null;
      this.formHeader = 'Add Mobile';
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.clearForm();
  }

  clearForm(): void {
    this.mobileName = '';
    this.price = null;
    this.ram = null;
    this.storage = null;
  }

  saveMobile(): void {
    this.showForm = false;

    const body = {
      name: this.mobileName,
      price: this.price,
      ram: this.ram,
      storage: this.storage,
    };

    if (this.id) {
      this.ms.putMobile({ ...body, id: this.id }).subscribe(() => {
        this.getMobiles();
      });
    } else {
      this.ms.postMobile(body).subscribe(() => {
        this.getMobiles();
      });
    }
  }
}
