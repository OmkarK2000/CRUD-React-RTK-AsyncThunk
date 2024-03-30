import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateUser } from "../features/gitUserSlice"


const Update = () => {
  const [user,setUser] = useState({
    name : "",
    email : '',
    age  : "",
    gender : ""
  })
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allUser = useSelector((state)=> state.app.users)
  const selectedUser = allUser.filter((item) => item.id === id)
  console.log("user : ", user)

  useEffect(()=>{
    setUser(selectedUser[0])
  },[])

  const handleInput = (e) =>{ 
    setUser({...user, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser(user))
    navigate("/read")
  }

  return (
    <form className="mt-5 w-50 mx-auto" onSubmit={handleSubmit}>
      <h3 className="text-center">Edit The Form</h3>
    <div className="mb-3 ">
      <label htmlFor="" className="htmlForm-label">Name</label><br />
      <input type="text" className="form-control" placeholder="Enter name" name="name" value={user && user.name}  onChange={handleInput} />
    </div>
    <div className="mb-3">
      <label htmlFor="" className="htmlForm-label">Email</label><br />
      <input type="email" className="form-control" placeholder="Enter email" name="email" value={user && user.email} onChange={handleInput} />
    </div>
    <div className="mb-3">
      <label htmlFor="" className="htmlForm-label">Age</label><br />
      <input type="number" className="form-control" placeholder="Enter age" name="age" value={user && user.age}  onChange={handleInput} />
    </div>

    <div className="form-check">
      <input className="form-check-input" type="radio" name="gender" value="male" id="gender1" checked={user && user.gender === "male"} onChange={handleInput}/>
      <label className="form-check-label" htmlFor="gender1">
        Male
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="gender" value="female" id="gender2" checked={user && user.gender === "female"}  onChange={handleInput}/>
      <label className="form-check-label" htmlFor="gender2" >
        female
      </label>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Update