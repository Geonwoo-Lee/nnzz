export enum HeaderTypes {
  basic = "basic",
  history = "history",
  close = "close",
}

export interface HeaderProps {
  type: HeaderTypes;
  title?: string;
  headerBg?: string;
  borderLess?: boolean;
  fixedHeader?: boolean;
  setting?: boolean;
  map?: boolean;
  square?: boolean;
  close?: boolean;
  menu?: boolean;
  logo?: boolean;
  profileImage?: boolean;
  back?: boolean;
}
