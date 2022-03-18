<template>
	<div>
		<v-container style="margin-left: 20px" height="200px" class="my-4">
			<v-layout row wrap>
				<v-card class="text-xs-center ma-4" height="260" width="260">
					<v-card-text>
						<p class="text-h4 text--primary" style="text-align: center">
							{{ postedFromDate }} 
						</p>
                        <p class="text-h5 text--primary" style="text-align: center">
							{{ postedFromHour }} 
						</p>
						<p></p>

						<div class="text--primary" style="text-align:center;!important">
							{{ info.stol }}<br />
						</div>
					</v-card-text>
					      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="10000"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
            >Prikaži više</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >{{ info.stol}}</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12"> Informacije o narudzbi
                
                <v-card>
					<v-simple-table>
						<thead>
							<tr>
								<th class="text-left">Jelo</th>
								<th class="text-left">Cijena</th>
								<th class="text-left">Količina</th>
							</tr>
						</thead>
						<tbody v-for="item in info.stavke" :key="item.infoName" :item="item">
							   <tr>
            <td>{{ item.infoName }}</td>
            <td>{{ item.infoPrice }} kn</td>
            <td>{{ item.kolicina }}</td>
			
                            
        </tr>
						</tbody>TOTAL: {{info.ukupno}}
                        
					</v-simple-table>
                </v-card>
                
                
                </div>
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
import moment from 'moment'
	export default {
		props: ["info"],
		name: "OrderCard",
        components:{
        },
        computed:{
            postedFromHour(){
               /* return moment(this.info.posted_at).fromNow(); */
               return moment(this.info.posted_at).format('hh:mm:ss');
            },
            postedFromDate(){
                
               return moment(this.info.posted_at).format('DD/MM/YYYY');
            }
        },
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
