import constants from "../api/index"

export default {
    state:{},
    mutations:{
        failute:(s,msg) =>{
            console.log("failure",msg);
        },
        // resetState(state){
        //     const initial = initialState();
        // }
    },
    actions:{
       getUserList({commit,dispatch},payload){
           let fail = (msg) => commit("failure",msg);
           return dispatch(
               "apiCall",
               {
                   method:"get",
                   params:payload,
                   url:constants.MANAGE_USERS,
               },
               {root:true}
           ).then((data)=>{
               if(data.ok){
                   return{ ok: true,
                totalCount:data.totalCount,
                fetchCount:data.fetchCount,
            list:data.data,
        };
               }else{
                   fail(data.message || "Failed to load User List"
                     );
                     return{
                         ok:false,
                         totalCount:data.totalCount,
                         fetchCount:0,
                         list:[],
                     }
               }
           }).catch((err)=>{
               console.log("Yo",err);
               fail(err.toString() || "failed to load User List");
               return {ok:false,totalCount:0,fetchCount:0,list:[]}
           })
       },
       addUser({commit,dispatch},payload){
           let fail = (msg) => commit("failure",msg);
           return dispatch(
               "apiCall",
               {
                   method:"post",
                   data:payload,
                   url:constants.MANAGE_USERS
               },
               {root:true}
           )
           .then(data=>{
               if(!data.ok) fail(data.message || "Failed to add Data");
               return data;
           }).catch(err=>{
               fail(err.toString() || "Failed to add Usre")
               return { ok: false,message:err.message,}
           })
       },
       editUser({ commit, dispatch }, payload) {
			let fail = (msg) => commit("failure", msg);
			return dispatch(
				"apiCall",
				{
					method: "put",
					data: payload,
					url: constants.MANAGE_USERS,
				},
				{ root: true }
			)
				.then((data) => {
					if (!data.ok) fail(data.message || "Failed to edit user");
					return data;
				})
				.catch((err) => {
					fail(err.toString() || "Failed to edit user");
					return {
						ok: false,
						message: err.message,
					};
				});
		},
        resetPassword({ commit, dispatch }, payload){
			let fail = (msg) => commit("failure", msg);
			return dispatch(
				"apiCall",
				{
					method: "post",
					data: payload,
					url: constants.RESET_PASSWORD,
				},
				{ root: true }
			)
				.then((data) => {
					if (!data.ok) fail(data.message || "Failed to Reset Password");
					return data;
				})
				.catch((err) => {
					fail(err.toString() || "Failed to Reset Password");
					return {
						ok: false,
						message: err.message,
					};
				});
		},
    }
}