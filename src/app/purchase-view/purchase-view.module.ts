import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseViewComponent } from './purchase-view.component';
import { MatButtonModule, MatCardModule, MatIconModule } from "@angular/material";
import { SharedModule } from "../shared/shared.module";
import { DebitCardModule } from "../debit-card/debit-card.module";

@NgModule({
  declarations: [
    PurchaseViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    DebitCardModule,
  ]
})
export class PurchaseViewModule { }
