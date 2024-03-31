import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, showUser } from "../features/gitUserSlice"
import CustomModal from "./CustomModal"
import { Link } from "react-router-dom"

const Read = () => {
  const dispatch = useDispatch()
  const { users, loading, searchData } = useSelector((state) => state.app)
  const [id, setId] = useState()
  const [showPopUp, setShowPopUp] = useState(false)
  const [radioData, setRadioData] = useState('all')

  // console.log(users)

  useEffect(() => {
    dispatch(showUser())
  }, [])



  if (loading) {
    return <h1>Loading..</h1>
  }

  return (
    <div className="container d-flex flex-column  ">
      <h3 className="mx-auto mt-2 mb-2">All Blogs</h3>
      <div className="d-flex justify-content-center gap-2">

        <input className="form-check-input" type="radio" name="gender" value="all" id="gender0" checked={radioData === "all"} onChange={(e)=>setRadioData(e.target.value)}/>
        <label className="form-check-label" htmlFor="gender0">All</label>
        <input className="form-check-input" type="radio" name="gender" value="male" id="gender1" checked={radioData === "male"} onChange={(e)=>setRadioData(e.target.value)} />
        <label className="form-check-label" htmlFor="gender1">Male</label>
        <input className="form-check-input" type="radio" name="gender" value="female" id="gender2" checked={radioData === "female"} onChange={(e)=>setRadioData(e.target.value)} />
        <label className="form-check-label" htmlFor="gender2" >Female</label>

      </div>
      {showPopUp && <CustomModal id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      <div className="container d-flex flex-row flex-wrap">
        {users &&

          users
            .filter((item) => {
              if (searchData.length === 0) {
                return item
              } else {
                return item.name.toLowerCase().includes(searchData.toLowerCase())
              }
            }).filter((item) => {
              if (radioData === "male") {
                return item.gender === radioData
              }else if(radioData === "female"){
                return item.gender === radioData
              }else{
                return item
              }
            })

            .map((item) => (
              <div key={item.id} className="card w-25 " >
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.email}</p>
                  <p className="card-text">{item.gender}</p>
                  <button to="" className="btn btn-primary mx-1" onClick={() => [setId(item.id), setShowPopUp(true)]}>View </button>
                  <Link to={`/edit/${item.id}`} className="btn btn-secondary mx-1">Edit </Link>
                  <Link onClick={() => dispatch(deleteUser(item.id))} className="btn btn-danger mx-1">Delete </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Read