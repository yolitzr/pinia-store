import { defineStore } from 'pinia';

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
