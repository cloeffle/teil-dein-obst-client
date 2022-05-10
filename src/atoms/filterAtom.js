import { atom } from 'recoil';

export const selectedFilterState = atom({
  key: 'selectedFilterState',
  default: [],
});

export const showFilterState = atom({
  key: 'showFilterState',
  default: false,
});
