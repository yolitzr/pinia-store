import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProductStore = defineStore('ProductStore', {
	//state
	state: () => {
		return {
			products: [],
		};
	},
	// actions

	actions: {
		async getFetchProducts() {
			this.products = (await import('@/data/products.json')).default;
			//this.products = (await fetch('/data/products.json')).data;
		},
	},
	// getters
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
