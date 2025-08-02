export interface Tag {
  text: string;
}

export interface Account {
  id: string;
  labels: Tag[];
  labelsInput: string;
  type: 'LDAP' | 'Локальная' | null;
  login: string;
  password: string | null;
}
