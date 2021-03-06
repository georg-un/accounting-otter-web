import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../core/entity/user';

export interface UserState extends EntityState<User> {
  currentUserId: string;
  currentUserActivated: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.userId
});

export function sortByFirstName(a: User, b: User): number {
  return a.firstName.localeCompare(b.firstName);
}

export const initialState: UserState = userAdapter.getInitialState({
  currentUserId: null,
  currentUserActivated: false,
  sortComparer: sortByFirstName,
});
