<template>
	<div>
		<v-container style="margin-left:20px" height="200px" class="my-4">
			<v-layout row wrap>
				<v-card class="text-xs-center ma-4" height="260" max-width="344">
					<v-card-text>
						<p class="text-h4 text--primary">IME KONOBOAR</p>
						<p></p>
                        
						<div class="text--primary" style="text-align:center;!important">
							Konobar<br />
						</div>
					</v-card-text>
					<v-card-actions>
						<v-btn text color="teal accent-4" style="margin-top:90px" @click="reveal = true">
							Prikaži više
						</v-btn>
					</v-card-actions>

					<v-expand-transition>
						<v-card
							v-if="reveal"
							class="transition-fast-in-fast-out v-card--reveal"
							style="height: 100%"
						>
							<v-card-text class="pb-0">
								<p class="text-h5 text--primary">Dodatne informacije</p>
								<p>
									OIB:12319239139
								</p><p>
									Broj mobitela: 0999541053
								</p><p>
									Mjesto stanovanja: Rovinjska ul. 14
								</p>
                                <p>
									Prva prijava u sustav: 10/7/2021
								</p>
							</v-card-text>
							<v-card-actions class="pt-0">
								<v-btn text color="teal accent-4" @click="reveal = false">
									Close
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-expand-transition>
				</v-card>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		name: "OsobljeCard",
		data: () => ({
			reveal: false,
		}),
	};
</script>
<style>
	.v-card--reveal {
		bottom: 0;
		opacity: 1 !important;
		position: absolute;
		width: 100%;
	}
</style>
