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
            >Više</v-btn>
      <v-btn style="margin-left:40px;"
        depressed @click="arhiviraj"
        color="green"
      >
        Arhiviraj   
      </v-btn>
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
                
          <v-btn
        depressed
        color="error"
        @click="izbrisi"
      >
        Izbriši narudžbu
      </v-btn>
                
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  id="zatvori"
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
import moment from 'moment';
import { db } from "@/firebase";
	export default {
		props: ["info"],
		name: "OrderCard",
        components:{
        },
        computed:{
            postedFromHour(){
               /* return moment(this.info.posted_at).fromNow(); */
               return moment(this.info.posted_at).format('HH:mm:ss');
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
			arhiviraj(){
        console.log(this.info)
        
          console.log("stavke", this.info.stavke)
          console.log("stol", this.info.stol)
          console.log("ukupno", this.info.ukupno)
          console.log("postedat", this.info.posted_at)
         if (confirm("Jeste li sigurni da želite arhivirati narudzbu?")) {
        db.collection("narudzba")
          .doc(this.info.id)
          .delete()
          .then(function () {
            console.log("narudzba izbrisana");
          })
          .catch(function (error) {
            console.error("Eror:", error);
          });
        db.collection("arhorder")
                  .add({
                    stavke: this.info.stavke,
                    stol: this.info.stol,
                    ukupno: this.info.ukupno,
                    posted_at: this.info.posted_at,
                  })
                  .then(() => {
                    console.log("Spremljeno u arhorder", this.info)
                  })


      }
      /* this.$emit("refresh"); */

      },
      izbrisi(){
         if (confirm("Jeste li sigurni da želite izbrisati narudzbu?")) {
        db.collection("narudzba")
          .doc(this.info.id)
          .delete()
          .then(function () {
            console.log("narudzba izbrisana");
          })
          .catch(function (error) {
            console.error("Eror:", error);
          }); 
      }
      document.getElementById("zatvori").click();
      this.$emit('ref')
      }},
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
