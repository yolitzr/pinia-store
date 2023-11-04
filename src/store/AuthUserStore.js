import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAuthUserStore = defineStore('AuthUserStore', {
	state: () => {
		return {
			username: 'Yolit',
		};
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
