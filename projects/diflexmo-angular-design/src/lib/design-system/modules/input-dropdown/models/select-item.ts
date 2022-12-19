export class SelectItem {
  name: string;

  value: string;

  description?: string | null;

  constructor(name: string, value: string, desription: string | null = null) {
    this.name = name;
    this.value = value;
    this.description = desription;
  }
}
