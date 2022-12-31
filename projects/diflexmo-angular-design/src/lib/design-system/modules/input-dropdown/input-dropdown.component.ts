import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Dropdown } from 'bootstrap';
import { ItemsCompactHelper } from '../../helpers/items-compact-helper';
import { InputSize } from '../../types/input-size.type';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { SelectItem } from './models/select-item';

@Component({
  selector: 'dfm-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss'],
})
export class InputDropdownComponent extends BaseControlValueAccessor implements OnInit, AfterViewInit, OnChanges {
  @Input() public items: SelectItem[] = [];

  @Input() public label: string = '';

  @Input() public placeholder: string = '';

  @Input() public hint: string = '';

  @Input() public showDescription: boolean = true;

  @Input() public multiple: boolean = false;

  @Input() public size: InputSize = 'md';

  @Input() public icon: string = '';

  @Input() public minQueryLength: number = 0;

  @Input() public typeToSearch: boolean = false;

  @Input() public typeToSearchText: string = '';

  @Input() public loading: boolean = false;

  @Input() public asyncSearch: boolean = false;

  @Output() public searchInput = new EventEmitter<string>();

  @Output() public menuClosed = new EventEmitter();

  @ViewChild('selectedItemsContainerRef') selectedItemsContainerRef!: ElementRef;

  @ViewChildren('selectedItemRef', { read: ElementRef }) selectedItemsRef!: QueryList<ElementRef>;

  @ViewChild('searchInputRef', { read: ElementRef }) searchInputRef!: ElementRef;

  @ViewChild('dropdown') dropdownRef!: ElementRef;

  public search: string = '';

  public selectedItemTags: SelectItem[] = [];

  public selectedItemTagsUnionIndex?: number;

  public filteredItems: SelectItem[] = [];

  private defaultMultipleDropdownPaddingRight = 8;

  private multipleDropdownWithIconPaddingRight = 51;

  private isDropdownClosed: boolean = true;

  private dropdownInstance?: Dropdown;

  public selectedItems: SelectItem[] = [];

  constructor(private changeDetectionRef: ChangeDetectorRef, @Optional() public control: NgControl, private eRef: ElementRef) {
    super();

    this.value = null;

    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  private wasInside = false;

  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout() {
    if (!this.wasInside) {
      this.dropdownInstance?.hide();
    }

    this.wasInside = false;
  }

  ngOnInit(): void {
    if (this.minQueryLength && !this.typeToSearchText) {
      this.typeToSearchText = `Please enter ${this.minQueryLength} or more characters`;
    }

    this.filteredItems = [...this.items];
  }

  ngAfterViewInit(): void {
    this.dropdownInstance = Dropdown.getOrCreateInstance(this.dropdownRef.nativeElement, {
      offset: [0, 3],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']?.previousValue !== changes['items']?.currentValue) {
      this.filteredItems = [...changes['items'].currentValue];
    }
  }

  override writeValue(value: string | string[]) {
    this.resetInputDropdown();

    if (!this.multiple) {
      const item = this.items.find((i) => i.value === value);

      if (item) {
        this.updateInputDropdown(item, true);
      }
    } else if (value && value.length) {
      const items = this.items.filter((i) => value.includes(i.value));
      items.forEach((i) => this.updateInputDropdown(i, false));
    }
  }

  updateSearch(query: string): void {
    this.search = query;

    if (!this.multiple && this.value) {
      this.value = null;
    }

    if (query && query.length >= this.minQueryLength) {
      this.searchInput.emit(query);
    } else {
      this.filteredItems = this.asyncSearch ? [] : [...this.items];
    }
  }

  searchItems(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    this.filteredItems = this.items.filter(
      (i) =>
        i.name.toLowerCase().includes(lowerCaseQuery) ||
        i.value.toLowerCase().includes(lowerCaseQuery) ||
        i.description?.toLowerCase().includes(lowerCaseQuery),
    );
  }

  selectItem(item: SelectItem): void {
    const isSelected = this.multiple ? this.value && this.value.includes(item.value) : this.value === item.value;
    this.updateInputDropdown(item, isSelected);
  }

  removeItem(item: SelectItem): void {
    this.updateMultiInputDropdown(item, true);
  }

  updateSelectedItems(): void {
    const itemsUnion = ItemsCompactHelper.getItemsUnion();

    this.selectedItemTags = [...this.selectedItems, itemsUnion];
    this.changeDetectionRef.detectChanges();

    const { items, itemsUnionIndex, containerWidth } = ItemsCompactHelper.compactItems(
      this.selectedItemTags,
      this.searchInputRef.nativeElement.offsetWidth - 210,
      8,
      this.selectedItemsRef,
    );

    this.selectedItemTags = [...items];
    this.selectedItemTagsUnionIndex = itemsUnionIndex;

    const paddingRight = this.typeToSearch ? this.defaultMultipleDropdownPaddingRight : this.multipleDropdownWithIconPaddingRight;
    this.searchInputRef.nativeElement.querySelector('.dfm-input').style.paddingRight = `${containerWidth + paddingRight}px`;
  }

  openDropdown() {
    this.dropdownInstance?.show();
  }

  checkIfDropdownIsClosed(mutationRecord: MutationRecord) {
    if (mutationRecord.type === 'attributes' && mutationRecord.attributeName === 'class') {
      this.isDropdownClosed = !this.isDropdownClosed;

      if (this.isDropdownClosed) {
        this.menuClosed.emit();
      }
    }
  }

  private updateInputDropdown(item: SelectItem, isSelected: boolean): void {
    if (this.multiple) {
      this.updateMultiInputDropdown(item, isSelected);
    } else {
      this.updateSingleInputDropdown(item);
    }
  }

  private updateMultiInputDropdown(item: SelectItem, isSelected: boolean): void {
    if (isSelected) {
      this.value = this.value.filter((i: string) => i !== item.value);
      this.selectedItems = this.selectedItems.filter((i) => i.value !== item.value);
    } else {
      this.value = this.value && this.value.length ? [...this.value, item.value] : [item.value];
      this.selectedItems.push(item);
    }

    this.updateSelectedItems();

    this.filteredItems = this.asyncSearch ? [] : [...this.items];
    this.search = '';
  }

  private updateSingleInputDropdown(item: SelectItem): void {
    this.setSingleInputDropdown(item);
  }

  private setSingleInputDropdown(item: SelectItem): void {
    this.value = item.value;
    this.search = item.name;

    if (this.asyncSearch) {
      this.filteredItems = [item];
    }

    this.dropdownInstance?.hide();
  }

  private resetInputDropdown(): void {
    this.value = null;
    this.search = '';
    this.selectedItems = [];
    this.filteredItems = this.asyncSearch ? [] : [...this.items];
    this.updateSelectedItems();
  }

  public focusout(value: any) {
    setTimeout(() => {
      if (!this.search) {
        this.onTouch(value);
      }
    }, 250);
  }
}
