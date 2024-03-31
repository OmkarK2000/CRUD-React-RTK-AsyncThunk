import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//createUser action
export const createUser = createAsyncThunk("createUser", async (data , {rejectWithValue})=>{
  const response = await fetch("https://65fec12ab2a18489b38684dc.mockapi.io/crud", {
    method : "POST",
    headers : {
      "Content-type" : "application/json",
    },
    body : JSON.stringify(data)
  })

  try{
    const result = response.json()
    return result
  }catch(err){
    return rejectWithValue(err)
  }
})

//showUser action
export const showUser = createAsyncThunk("showUser", async (args, {rejectWithValue})=>{
  const response = await fetch("https://65fec12ab2a18489b38684dc.mockapi.io/crud")
  try{
    const result = await response.json()
    return result
  }catch(err){
    return rejectWithValue(err)
  }
})

export const deleteUser = createAsyncThunk("deleteUser", async (id, {rejectWithValue}) => {
  const response = await fetch(`https://65fec12ab2a18489b38684dc.mockapi.io/crud/${id}`, {
    method : "DELETE"
  })
  try{
    const result = await response.json()
    return result
  }catch(err){
    return rejectWithValue(err)
  }
})

export const updateUser = createAsyncThunk("updateUser", async (data, {rejectWithValue}) =>{
  console.log(data)
  const response = await fetch(`https://65fec12ab2a18489b38684dc.mockapi.io/crud/${data.id}`,{
    method : "PUT",
    headers : {
      "Content-Type" : "Application/Json"
    },
    body : JSON.stringify(data)
  })
  try{
    const result = await response.json()
    return result
  }catch(err){
    return rejectWithValue(err)
  }
})

export const gitUserSlice = createSlice({
  name : "gitUser",
  initialState : {
    users : [],
    loading : false,
    error : null,
    searchData : "",
  },
  reducers : {
    searchUser : (state, action)=>{
      console.log(action.payload)
      state.searchData = action.payload
    }
  },
  extraReducers(builder){
    builder 
      .addCase(createUser.pending, (state)=>{
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state,action)=>{
        state.loading = false,
        state.users =action.payload
      })
      .addCase(createUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(showUser.pending, (state)=>{
        state.loading = true
      })
      .addCase(showUser.fulfilled, (state,action)=>{
        state.loading = false,
        state.users = action.payload
      })
      .addCase(showUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state)=>{
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action)=>{
        state.loading = false

        const {id} = action.payload
        if(id){
          state.users = state.users.filter((ele) => ele.id !== id)
        }
      })
      .addCase(deleteUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending , (state)=>{
        state.loading = true;
      })
      .addCase(updateUser.fulfilled,(state, action)=>{
        state.loading = false
        state.uesrs = state.users.map((ele)=>(
          ele.id === action.payload.id ?  action.payload : ele 
        ))
      })
      .addCase(updateUser.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
  }
})

export const {searchUser} = gitUserSlice.actions;
export default gitUserSlice.reducer;