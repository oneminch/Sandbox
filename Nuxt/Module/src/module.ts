import {
	defineNuxtModule,
	addPlugin,
	createResolver,
	addComponent,
	addImports
} from "@nuxt/kit";

export interface ModuleOptions {
	duration: number;
}

declare module "@nuxt/schema" {
	interface PublicRuntimeConfig {
		toasty: ModuleOptions;
	}
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "nuxt-toasty",
		configKey: "toasty",
		compatibility: {
			nuxt: "^3.0.0"
		}
	},
	defaults: { duration: 5000 },
	setup(_options, _nuxt) {
		const resolver = createResolver(import.meta.url);

		_nuxt.options.runtimeConfig.public.toasty = {
			..._options
		};

		addPlugin({
			src: resolver.resolve("./runtime/plugins/toast")
		});

		addComponent({
			name: "AppToasty",
			filePath: resolver.resolve("./runtime/components/AppToasty.vue")
		});

		addImports({
			name: "useToast",
			as: "useToast",
			from: resolver.resolve("./runtime/composables/useToast")
		});
	}
});
