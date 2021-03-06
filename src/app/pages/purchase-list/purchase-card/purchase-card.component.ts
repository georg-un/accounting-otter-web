import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Purchase } from '../../../core/entity/purchase';
import { Debit } from '../../../core/entity/debit';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { Observable } from 'rxjs';
import { UserSelectors } from '../../../store/selectors/user.selectors';
import { filter, map } from 'rxjs/operators';
import { User } from '../../../core/entity/user';
import { Category } from '../../../core/entity/category';
import { CategorySelectors } from '../../../store/selectors/category.selectors';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.scss']
})
export class PurchaseCardComponent implements OnInit {

  @Input() purchase: Purchase;
  buyerAvatarUrl$: Observable<string>;
  receiverAvatarUrl$?: Observable<string>;
  category$: Observable<Category>;

  @Output() cardClick: EventEmitter<string> = new EventEmitter();

  debitSum: number;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    // Calculate total amount
    this.debitSum = this.purchase.debits
      .map((debit: Debit) => debit.amount)
      .reduce((sum, current) => sum + current);
    // Get buyer avatar
    this.buyerAvatarUrl$ = this.store.select(UserSelectors.selectUserById(), {id: this.purchase.buyerId})
      .pipe(
        filter(Boolean),
        map((user: User) => user.avatarUrl)
      );
    // If transaction is a compensation, get receiver avatar
    if (this.purchase.isCompensation) {
      this.receiverAvatarUrl$ = this.store.select(UserSelectors.selectUserById(), {id: this.purchase.debits[0].debtorId})
        .pipe(
          filter(Boolean),
          map((user: User) => user.avatarUrl)
        );
    }
    // Get the category
    this.category$ = this.store.select(CategorySelectors.selectCategoryById(this.purchase.categoryId));
  }

  onClick(): void {
    this.cardClick.emit(this.purchase.purchaseId);
  }

}
