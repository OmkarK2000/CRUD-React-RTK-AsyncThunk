import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, showUser } from "../features/gitUserSlice";
import { useNavigate } from "react-router-dom";


function Create() {
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(showUser())
  },[])

  const handelInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData)
    dispatch(createUser(userData))
    navigate("/read")
  }

  return (
    <form className="mt-5 w-50 mx-auto" onSubmit={handleSubmit}>
      <h3 className="text-center">Fill The Form</h3>
      <div className="mb-3 ">
        <label htmlFor="" className="htmlForm-label">Name</label><br />
        <input type="text" className="form-control" placeholder="Enter name" name="name" onChange={handelInput} />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="htmlForm-label">Email</label><br />
        <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={handelInput} />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="htmlForm-label">Age</label><br />
        <input type="number" className="form-control" placeholder="Enter age" name="age" onChange={handelInput} />
      </div>

      <div className="form-check">
        <input className="form-check-input" type="radio" name="gender" value="male" id="gender1" onChange={handelInput} />
        <label className="form-check-label" htmlFor="gender1">
          Male
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="gender" value="female" id="gender2" onChange={handelInput} />
        <label className="form-check-label" htmlFor="gender2" >
          Female
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Create;