import { ElementRef, QueryList } from '@angular/core';
import { SelectItem } from '../modules/input-dropdown/models/select-item';

export class ItemsCompactHelper {
  public static getItemsUnion(itemsUnionName: string = '+100 items') {
    return new SelectItem(itemsUnionName, '');
  }

  public static compactItems(
    itemsToCompact: any[],
    containerWidth: number,
    itemsGap: number,
    itemsElementRef: QueryList<ElementRef>,
    itemsUnionName: string = 'items',
  ): { items: any[]; itemsUnionIndex: number; containerWidth: number } {
    let items = [...itemsToCompact];
    let itemsUnionIndex = items.length - 1;
    const itemsUnion = items[itemsUnionIndex];

    const itemsCalculations = this.getItemsCalculations(itemsUnionIndex, containerWidth, itemsGap, itemsElementRef);
    const numberOfItemsToDisplay = itemsCalculations.lastVisibleIndex;
    const numberOfItemsToHide = items.length - 1 - numberOfItemsToDisplay;

    if (numberOfItemsToHide > 1) {
      const itemsUnionNamePostfix = itemsUnionName ? ` ${itemsUnionName}` : '';
      itemsUnion.name = numberOfItemsToHide > 100 ? itemsUnion.name : `${numberOfItemsToHide}${itemsUnionNamePostfix}`;
      items = [...items.slice(0, numberOfItemsToDisplay), itemsUnion];
      itemsUnionIndex = items.length - 1;
    } else {
      items = items.slice(0, items.length - 1);
    }

    return { items, itemsUnionIndex, containerWidth: itemsCalculations.containerWidth };
  }

  private static getItemsCalculations(
    itemsUnionIndex: number,
    containerWidth: number,
    itemsGap: number,
    itemsElementRef: QueryList<ElementRef>,
  ): { lastVisibleIndex: number; containerWidth: number } {
    let lastVisibleItemIndex = 0;
    let visibleItemsUnionIndex = 0;
    let itemsContainerWidth = 0;
    let itemsContainerWithUnionWidth = 0;

    const itemsUnionWidth = itemsElementRef.get(itemsUnionIndex)!.nativeElement.offsetWidth + itemsGap;

    for (let i = 0; i < itemsElementRef.length - 1; i++) {
      const selectedItemWidth = itemsElementRef.get(i)!.nativeElement.offsetWidth + itemsGap;
      const possibleItemsContainerWithUnionWidth = itemsContainerWidth + itemsUnionWidth;

      if (possibleItemsContainerWithUnionWidth <= containerWidth) {
        itemsContainerWithUnionWidth = possibleItemsContainerWithUnionWidth;
        visibleItemsUnionIndex = i;
      }

      itemsContainerWidth += selectedItemWidth;

      if (itemsContainerWidth <= containerWidth) {
        lastVisibleItemIndex = i;
      } else {
        return {
          lastVisibleIndex: visibleItemsUnionIndex < lastVisibleItemIndex ? visibleItemsUnionIndex : lastVisibleItemIndex,
          containerWidth:
            itemsContainerWithUnionWidth < itemsContainerWidth && itemsContainerWithUnionWidth !== 0
              ? itemsContainerWithUnionWidth
              : itemsContainerWidth,
        };
      }
    }

    return { lastVisibleIndex: lastVisibleItemIndex, containerWidth: itemsContainerWidth };
  }
}
