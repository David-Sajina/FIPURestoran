<template>
	<div>
		<v-container style="margin-left: 20px" height="200px" class="my-4">
			<v-layout row wrap>
				<v-card class="text-xs-center ma-4" height="260" width="260">
					<v-card-text>
						<p class="text-h4 text--primary" style="text-align: center">
							{{ info.posted_at }} 
						</p>
						<p></p>

						<div class="text--primary" style="text-align:center;!important">
							{{ info.stol }}<br />
						</div>
					</v-card-text>
					      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
            >From the bottom</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Opening from the bottom</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">Hello world!</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
				
				</v-card>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		props: ["info"],
		name: "OrderCard",
		data: () => {
			return {
				reveal: false,
                cards: [],
			};
		},
		methods: {
			
		},
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
