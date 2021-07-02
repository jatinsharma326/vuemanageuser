<template>
   <div >
		<!-- Design a Card had some property which is dynamic class  -->
		<!-- Mani slot which was used by the UserComponent
		are topLeft,topRight,mainContent,mainContentSubtitle,actionButton and more-->
	<!-- <v-container>
		<v-row>
			<v-col> -->
				
		<v-card
			class="my-2" elevation="23" outlined shaped max-width="344"
		>
			<div class="top-content-wrapper">
				<div class="subtitle ">
                   
					<!-- v-chip is like the button with no click and 0 opacity -->
					<div>
						<v-card-title>
						<slot name="designation"></slot>
						</v-card-title>
					</div>
    
				</div>
                <div>
                    <v-card-subtitle>
                        <slot name="subTitle"></slot>
                    </v-card-subtitle>
                </div>
				<div class="subTitletwo ">
                    <v-card-subtitle>
					<slot name="subTitletwo"></slot>
                    </v-card-subtitle>
				</div>
			</div>

			<div class="main-content-wrapper">
				
				<div class="main-content-right">
                    <v-card-text>
					<slot name="mainContentSubtitle"></slot>
                    </v-card-text>
				</div>
			</div>
			<!-- <div class="more-info subtitle">
				<slot name="moreInfo"></slot>
			</div> -->

			<div class="bottom-content-wrapper">
				<v-card-actions>
					<div class="action-button">
						<slot name="actionButtons"></slot>
					</div>

					<v-spacer></v-spacer>
					<!-- ExpandedCard is named a chevron -->
					<!-- 11))) These Expand Card came from User as a props and then it be used according to the usage  -->

					<div v-if="expandCard">
						<v-btn color="tertiary" icon @click="show = !show">
							<v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
						</v-btn>
					</div>
				</v-card-actions>
			</div>
		</v-card>
		<v-card
			class="expansionPanelWrapper"
			
		>
			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>
					<slot name="expandCardContent"></slot>
				</div>
			</v-expand-transition>

		</v-card>
	
        </div>
</template>

<script>
    export default {
        data(){
            return{ 
                show:false
            }
        },
		created(){
			console.log("card was created",this.show);
		},
        props:{
            expandCard: {
				required: false,
				type: Boolean,
				default: false,
			},
        }
    }
</script>

<style lang="scss" scoped>
.flexing{
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
}
</style>