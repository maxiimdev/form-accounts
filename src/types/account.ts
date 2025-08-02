export interface Tag {
  text: string;
}

export interface Account {
  id: string;
  labels: Tag[];
  labelsInput: string; // Временное поле для ввода меток
  type: 'LDAP' | 'Локальная' | null;
  login: string;
  password: string | null;
}
