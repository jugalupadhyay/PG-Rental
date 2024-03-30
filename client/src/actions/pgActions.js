import axios from "axios";
export const getAllPgs = () => async (dispatch) => {
  dispatch({ type: "GET_PGS_REQUEST" });
  try {
    const response = await axios.get("/api/pgs/getallpgs");
    console.log(response);
    dispatch({ type: "GET_PGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PGS_FAILED", payload: error });
  }
};

export const addPg = (pg) => async (dispatch) => {
  dispatch({ type: "ADD_PG_REQUEST" });
  try {
    const response = await axios.post("/api/pgs/addpg", { pg });
    console.log(response);
    alert("PG Added Successfully");
    dispatch({ type: "ADD_PG_SUCCESS" });
    window.location.reload();
  } catch (error) {
    dispatch({ type: "ADD_PG_FAILED", payload: error });
  }
};

export const deletePg = (pgid) => async (dispatch) => {
  try {
    const response = await axios.post("/api/pgs/deletepg", { pgid });
    alert("PG Deleted Successfully");
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something Went Wrong");
    console.log(error);
  }
};
