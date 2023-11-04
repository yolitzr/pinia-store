import { defineStore, acceptHMRUpdate } from 'pinia';
import { groupBy } from 'lodash';
import { useAuthUserStore } from '@/store/AuthUserStore';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('CartStore', {
	historyEnabled: true,
	state: () => {
		return {
			items: useLocalStorage('CartStore:items', []),
		};
	},

	getters: {
		count: (state) => state.items.length,
		isEmpty: (state) => state.count === 0,

		grouped: (state) => {
			const grouped = groupBy(state.items, (item) => item.name);
			const sorted = Object.keys(grouped).sort();

			let inOrder = {};

			sorted.forEach((key) => (inOrder[key] = grouped[key]));

			return inOrder;
		},

		// dynamic getters
		groupCount: (state) => (name) => state.grouped[name].length,
		totalPrice: (state) =>
			state.items.reduce((prevValue, currentValue) => {
				return prevValue + (currentValue.price || 0);
			}, 0),

		// count() {
		// 	return this.items.length;
		// },
		// isEmpty() {
		// 	return this.count === 0;
		// },
	},

	actions: {
		addItemsToCart(count, item) {
			count = parseInt(count);

			for (let index = 0; index < count; index++) {
				this.items.push({ ...item });
			}
		},

		deleteItem(name) {
			this.items = this.items.filter((item) => item.name !== name);
		},

		setItemCount(item, count) {
			this.deleteItem(item.name);
			this.addItemsToCart(count, item);
		},

		checkout() {
			const authUserStore = useAuthUserStore();
			alert(
				` ${authUserStore.username} just bought ${this.count} items at a total of ${this.totalPrice}`
			);
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
