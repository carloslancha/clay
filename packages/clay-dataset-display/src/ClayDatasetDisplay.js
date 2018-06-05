import 'clay-card-grid';
import 'clay-list';
import 'clay-table';
import {
	actionItemsValidator,
	creationMenuItemsValidator,
	filterItemsValidator,
} from 'clay-management-toolbar';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import defineWebComponent from 'metal-web-component';
import Soy from 'metal-soy';

import templates from './ClayDatasetDisplay.soy.js';

/**
 * Metal ClayDatasetDisplay component.
 * @extends ClayComponent
 */
class ClayDatasetDisplay extends ClayComponent {
	/**
	 * @inheritDoc
	 */
	created() {
		let selectedItems = [];
		let totalItems = 0;

		if (this.items) {
			for (let item of this.items) {
				if (item.items) {
					totalItems += item.items.length;

					for (let childrenItem of item.items) {
						if (childrenItem.selected) {
							selectedItems.push(childrenItem);
						}
					}
				} else {
					totalItems++;

					if (item.selected) {
						selectedItems.push(item);
					}
				}
			}
		}

		this._selectedItems = selectedItems;
		this._totalItems = totalItems;
	}

	/**
	 * Iterates over the selected items array, mark all as not selected and
	 * removes them from the selectedItems array.
	 * @private
	 */
	_deselectAllItems() {
		for (let item of this._selectedItems) {
			item.selected = false;
		}

		this._selectedItems = [];
	}

	/**
	 * Returns the selected items.
	 * @private
	 * @return {?array|undefined} the items.
	 */
	getSelectedItems() {
		return this._selectedItems;
	}

	/**
	 * Continues the propagation of the action item clicked event
	 * @param {!Event} event
	 * @private
	 * @return {Boolean} If the event has been prevented or not.
	 */
	_handleActionItemClicked(event) {
		return !this.emit({
			data: event.data,
			name: 'actionItemClicked',
			originalEvent: event,
		});
	}

	/**
	 * Continues the propagation of the plus button clicked event
	 * @param {!Event} event
	 * @private
	 */
	_handleCreationButtonClicked(event) {
		this.emit('creationButtonClicked', event);
	}

	/**
	 * Continues the propagation of the creation menu item clicked event
	 * @param {!Event} event
	 * @private
	 * @return {Boolean} If the event has been prevented or not.
	 */
	_handleCreationMenuItemClicked(event) {
		return !this.emit({
			data: event.data,
			name: 'creationMenuItemClicked',
			originalEvent: event,
		});
	}

	/**
	 * Continues the propagation of the creation menu more button clicked event
	 * @param {!Event} event
	 * @private
	 */
	_handleCreationMenuMoreButtonClicked(event) {
		this.emit('creationMenuMoreButtonClicked', event);
	}

	/**
	 * Continues the propagation of the filter done clicked event
	 * @param {!Event} event
	 * @private
	 */
	_handleFilterDoneClicked(event) {
		this.emit('filterDoneClicked', event);
	}

	/**
	 * Continues the propagation of the filter item click event
	 * @param {!Event} event
	 * @private
	 * @return {Boolean} If the event has been prevented or not.
	 */
	_handleFilterItemClicked(event) {
		return !this.emit({
			data: event.data,
			name: 'filterItemClicked',
			originalEvent: event,
		});
	}

	/**
	 * Toggles the selection of an item and adds or removes it from selected items
	 * list.
	 * @param {!Event} event
	 * @private
	 */
	_handleItemToggled(event) {
		let checkedStatus = event.target.checked;
		let itemId = event.target.getAttribute('value');

		if (!checkedStatus) {
			for (let [index, item] of this._selectedItems.entries()) {
				if (
					item[
						this.views[this.selectedView].schema.inputValueField
					] === itemId
				) {
					item.selected = false;
					this._selectedItems.splice(index, 1);
					break;
				}
			}
		} else {
			let found = false;

			if (this.items) {
				for (let item of this.items) {
					if (item.items) {
						for (let childrenItem of item.items) {
							if (
								childrenItem[
									this.views[this.selectedView].schema
										.inputValueField
								] === itemId
							) {
								childrenItem.selected = true;
								this._selectedItems.push(childrenItem);
								found = true;
								break;
							}
						}
					} else {
						if (
							item[
								this.views[this.selectedView].schema
									.inputValueField
							] === itemId
						) {
							item.selected = true;
							this._selectedItems.push(item);
							found = true;
						}
					}

					if (found) {
						break;
					}
				}
			}
		}

		this.items = this.items;
		this._selectedItems = this._selectedItems;
	}

	/**
	 * Continues the propagation of the search event
	 * @param {!Event} event
	 * @private
	 */
	_handleSearch(event) {
		this.emit('search', event);
	}

	/**
	 * Continues the propagation of the sorting button clicked event
	 * @param {!Event} event
	 * @private
	 */
	_handleSortingButtonClicked(event) {
		this.emit('sortingButtonClicked', event);
	}

	/**
	 * Changes the selection status of the dataset items on management toolbar
	 * select page checkbox change.
	 * @param {!Event} event
	 * @private
	 */
	_handleSelectPageCheckboxChanged(event) {
		let checkboxStatus = event.target.checked;

		if (checkboxStatus) {
			this._selectAllItems();
		} else {
			this._deselectAllItems();
		}
	}

	/**
	 * Changes the view on management toolbar view type click.
	 * @param {!Object} item
	 * @private
	 */
	_handleViewTypeItemClicked(item) {
		this.views[this.selectedView].active = false;

		for (let [index, view] of this.views.entries()) {
			if (view === item) {
				this.views[index].active = true;
				this.selectedView = index;
				break;
			}
		}
	}

	/**
	 * Iterates over the items array, mark all as selected and adds them to the
	 * selectedItems array.
	 * @private
	 */
	_selectAllItems() {
		let selectedItems = [];

		for (let item of this.items) {
			if (item.items) {
				for (let childrenItem of item.items) {
					childrenItem.selected = true;

					selectedItems.push(childrenItem);
				}
			} else {
				item.selected = true;

				selectedItems.push(item);
			}
		}

		this._selectedItems = selectedItems;
	}
}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
ClayDatasetDisplay.STATE = {
	/**
	 * The selected items of the item list. For internatl purposes.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(array|undefined)}
	 */
	_selectedItems: Config.array().internal(),

	/**
	 * The total number of items in the item list. For internatl purposes.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(number|undefined)}
	 */
	_totalItems: Config.number().internal(),

	/**
	 * List of items to display in the management toolbar actions menu.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(array|undefined)}
	 */
	actionItems: actionItemsValidator,

	/**
	 * Configuration of the management bar plus button.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(object|string|bool|undefined)}
	 */
	creationMenu: Config.shapeOf({
		caption: Config.string(),
		helpText: Config.string(),
		maxPrimaryItems: Config.number(),
		maxSecondaryItems: Config.number(),
		maxTotalItems: Config.number(),
		primaryItems: creationMenuItemsValidator,
		secondaryItems: creationMenuItemsValidator,
		viewMoreURL: Config.string(),
	}),

	/**
	 * CSS classes to be applied to the element.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	elementClasses: Config.string(),

	/**
	 * List of filter menu items.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(array|undefined)}
	 */
	filterItems: filterItemsValidator,

	/**
	 * Id to be applied to the element.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	id: Config.string(),

	/**
	 * Items of the dataset.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(array|undefined)}
	 */
	items: Config.array(),

	/**
	 * URL of the search form action
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	searchActionURL: Config.string(),

	/**
	 * Name of the search form.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	searchFormName: Config.string(),

	/**
	 * Name of the search input.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	searchInputName: Config.string(),

	/**
	 * Flag to indicate if the dataset is selectable.
	 * @default false
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?bool}
	 */
	selectable: Config.bool().value(false),

	/**
	 * Position in the views list of the selected view.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(number|undefined)}
	 */
	selectedView: Config.number(),

	/**
	 * Flag to indicate if management toolbar creation menu button should be
	 * shown or not.
	 * @default true
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?bool}
	 */
	showCreationMenu: Config.bool().value(true),

	/**
	 * Flag to indicate if the `Done` button in management toolbar filter dropdown
	 * should be shown or not.
	 * @default true
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?bool}
	 */
	showFiltersDoneButton: Config.bool().value(true),

	/**
	 * Sorting order.
	 * @default asc
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	sortingOrder: Config.oneOf(['asc', 'desc']).value('asc'),

	/**
	 * The path to the SVG spritemap file containing the icons.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {!string}
	 */
	spritemap: Config.string().required(),

	/**
	 * Header of the list.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(string|undefined)}
	 */
	title: Config.string(),

	/**
	 * List of view items.
	 * @default undefined
	 * @instance
	 * @memberof ClayDatasetDisplay
	 * @type {?(array|undefined)}
	 */
	views: Config.arrayOf(
		Config.shapeOf({
			active: Config.bool().value(false),
			disabled: Config.bool().value(false),
			href: Config.string(),
			icon: Config.string().required(),
			id: Config.string().required(),
			label: Config.string().required(),
		})
	),
};

defineWebComponent('clay-dataset-display', ClayDatasetDisplay);

Soy.register(ClayDatasetDisplay, templates);

export {ClayDatasetDisplay};
export default ClayDatasetDisplay;
