import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Dropdown } from 'bootstrap';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ItemsCompactHelper } from '../../helpers/items-compact-helper';
import { InputSize } from '../../types/input-size.type';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { SelectItem } from './models/select-item';

@Component({
  selector: 'dfm-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss', '../input/input.component.scss'],
})
export class InputDropdownComponent extends BaseControlValueAccessor implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() public items: SelectItem[] = [];

  @Input() public label: string = '';

  @Input() public placeholder: string = '';

  @Input() public hint: string = '';

  @Input() public showDescription: boolean = true;

  @Input() public showDescriptionInTitle: boolean = false;

  @Input() public multiple: boolean = false;

  @Input() public size: InputSize = 'md';

  @Input() public icon: string = '';

  @Input() public minQueryLength: number = 0;

  @Input() public typeToSearch: boolean = false;

  @Input() public typeToSearchText: string = '';

  @Input() public loading: boolean = false;

  @Input() public asyncSearch: boolean = false;

  @Input() public showDropdownIcon: boolean = true;

  @Input() public showSelectAll: boolean = false;

  @Input() public readonly: boolean = false;

  @Input() public maxMenuHeight = '300px';

  @Input() public customOptionTemplate?: TemplateRef<any>;

  @Output() public searchInput = new EventEmitter<string>();

  @Output() public menuClosed = new EventEmitter();

  @Output() public scrolled = new EventEmitter();

  @ViewChild('selectedItemsContainerRef') selectedItemsContainerRef!: ElementRef;

  @ViewChildren('selectedItemRef', { read: ElementRef }) selectedItemsRef!: QueryList<ElementRef>;

  @ViewChild('searchInputRef') searchInputRef!: ElementRef;

  @ViewChild('dropdown') dropdownRef!: ElementRef;

  @ViewChildren('dropdownItems') dropdownItems!: QueryList<ElementRef>;

  public currentHighlighted?: number;

  public search: string = '';

  public selectedItemTags: SelectItem[] = [];

  public selectedItemTagsUnionIndex?: number;

  public filteredItems: SelectItem[] = [];

  private defaultMultipleDropdownPaddingRight = 8;

  private multipleDropdownWithIconPaddingRight = 51;

  private isDropdownClosed: boolean = true;

  public dropdownInstance?: Dropdown;

  public selectedItems: SelectItem[] = [];

  private resizeSelectedItems$ = new Subject<void>();

  private wasInside = false;

  private subscriptions = new Subscription();

  public get isAllSelected(): boolean {
    return this.filteredItems.length === this.selectedItems.length;
  }

  constructor(private changeDetectionRef: ChangeDetectorRef, @Optional() public control: NgControl, private eRef: ElementRef) {
    super();

    this.value = '';

    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

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

    const subscription = this.resizeSelectedItems$.pipe(debounceTime(50)).subscribe(() => this.updateSelectedItems());
    this.subscriptions.add(subscription);
  }

  ngAfterViewInit(): void {
    this.dropdownInstance = Dropdown.getOrCreateInstance(this.dropdownRef.nativeElement, {
      offset: [0, 3],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = [...this.items];

      if (!this.asyncSearch && this.value) {
        const currentSearch = this.search;
        this.writeValue(this.multiple ? [...this.value] : this.value);

        if (!this.search) {
          this.search = currentSearch;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  override writeValue(value: string | string[]) {
    if (JSON.stringify(this.value) === JSON.stringify(value)) {
      return;
    }

    if (!this.multiple) {
      const item = this.items.find((i) => i.value === value);

      if (item) {
        this.updateInputDropdown(item, true);
      }

      return;
    }

    const newItems = this.items.filter((i) => value.includes(i.value));
    const existingItems = this.selectedItems.filter((i) => value.includes(i.value));

    newItems.forEach((newItem) => {
      const exists = existingItems.find((existingItem) => newItem.value === existingItem.value);

      if (!exists) {
        existingItems.push(newItem);
      }
    });

    this.selectedItems = existingItems;
    this.value = this.selectedItems.map((i) => i.value);

    this.updateSelectedItems();
  }

  onSearchChange(query: string): void {
    this.dropdownInstance?.show();
    this.search = query;

    if (!this.multiple && this.value) {
      this.value = '';
    }

    this.emitSearchEvent();
  }

  private emitSearchEvent() {
    if (!this.typeToSearch) {
      return;
    }
    const queryLength = this.search ? this.search.length : 0;

    if (queryLength >= this.minQueryLength) {
      if (!this.asyncSearch) {
        this.searchItems(this.search);
      }
      this.searchInput.emit(this.search);
    } else if (this.asyncSearch) {
      this.filteredItems = [];
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

    const paddingRight = !this.showDropdownIcon ? this.defaultMultipleDropdownPaddingRight : this.multipleDropdownWithIconPaddingRight;
    this.searchInputRef.nativeElement.style.paddingRight = `${containerWidth + paddingRight}px`;
  }

  openDropdown() {
    this.dropdownInstance?.show();
  }

  checkIfDropdownIsClosed(mutationRecord: MutationRecord) {
    if (mutationRecord.type === 'attributes' && mutationRecord.attributeName === 'class') {
      this.isDropdownClosed = !this.isDropdownClosed;

      if (this.isDropdownClosed) {
        this.currentHighlighted = undefined;
        this.menuClosed.emit();
      } else {
        this.emitSearchEvent();
      }
    }
  }

  inputResized() {
    this.resizeSelectedItems$.next();
  }

  private updateInputDropdown(item: SelectItem, isSelected: boolean): void {
    if (this.multiple) {
      this.updateMultiInputDropdown(item, isSelected);
    } else {
      this.setSingleInputDropdown(item);
    }
  }

  private updateMultiInputDropdown(item: SelectItem, isSelected: boolean): void {
    this.selectedItems = isSelected
      ? (this.selectedItems = this.selectedItems.filter((i) => i.value !== item.value))
      : (this.selectedItems = [...new Set([...this.selectedItems, item])]);

    this.value = this.selectedItems.map((i) => i.value);

    this.updateSelectedItems();
    this.searchInputRef.nativeElement.select();
  }

  private setSingleInputDropdown(item: SelectItem): void {
    this.value = item.value;
    if (this.showDescriptionInTitle) {
      this.search = `${item.name} ${item.description}`;
    } else {
      this.search = item.name;
    }

    if (this.asyncSearch && this.currentHighlighted === undefined) {
      this.filteredItems = [item];
    }

    if (this.currentHighlighted === undefined) {
      this.dropdownInstance?.hide();
    }
  }

  private resetInputDropdown(): void {
    this.value = '';
    this.search = '';
    this.selectedItems = [];
    this.filteredItems = this.asyncSearch ? [] : [...this.items];
    this.updateSelectedItems();
    this.dropdownInstance?.hide();
  }

  private scrollToHighlightedOption() {
    if (this.currentHighlighted !== undefined) {
      const currentOption = this.dropdownItems.toArray()[this.currentHighlighted];
      currentOption.nativeElement.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      if (this.currentHighlighted === undefined || this.currentHighlighted === this.filteredItems.length - 1) {
        this.currentHighlighted = 0;
      } else {
        this.currentHighlighted++;
      }
      this.scrollToHighlightedOption();
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      if (!this.currentHighlighted || this.currentHighlighted === 0) {
        this.currentHighlighted = this.filteredItems.length - 1;
      } else {
        this.currentHighlighted--;
      }
      this.scrollToHighlightedOption();
      event.preventDefault();
    }

    if (event.key === 'Delete') {
      this.currentHighlighted = undefined;
      if (!this.multiple) {
        this.resetInputDropdown();
      } else {
        this.search = '';
        this.emitSearchEvent();
      }
    }

    if (this.currentHighlighted !== undefined && event.key === 'Enter') {
      this.selectItem(this.filteredItems[this.currentHighlighted]);
      if (!this.multiple) this.dropdownInstance?.hide();
    }

    if (event.key !== 'Tab' && !event.shiftKey && !event.altKey && !event.ctrlKey) {
      this.dropdownInstance?.show();
    } else {
      this.dropdownInstance?.hide();

      if (this.asyncSearch && !this.multiple && this.currentHighlighted !== undefined) {
        this.filteredItems = [this.filteredItems[this.currentHighlighted]];
      }

      this.currentHighlighted = undefined;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  public toggleSelectAll(): void {
    if (!this.multiple) {
      return;
    }

    if (!this.isAllSelected) {
      this.value = [];
      this.selectedItems = [];
      this.filteredItems.forEach((i) => {
        this.value.push(i.value);
        this.selectedItems.push(i);
      });
    } else {
      this.value = [];
      this.selectedItems = [];
    }

    this.updateSelectedItems();
  }

  toggleDropdownMenu() {
    if (!this.readonly) {
      this.dropdownInstance?.toggle();
    }
  }
}
