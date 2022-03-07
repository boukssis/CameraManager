import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getCameras, reset } from "../../features/cameras/cameraSlice";
import MaterialTable from 'material-table'
import { Container } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

const Home = () => {
  const [tableData,setTableData]=useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cameras, isLoading, isError, message } = useSelector(
    (state) => state.cameras
  );

  useEffect( () => {
    if (isError) {
      console.log("error", message);
    }
    if (!user) {
      navigate("/login");
    }
     dispatch(getCameras());
     
      
    return () => {
      dispatch(reset());
    };
  }, [user,isError, message, navigate, dispatch]);


useEffect(()=>{
  setTableData(cameras.map(row => ({...row})))
 
 
},[cameras])

const handleClick =(cameraId)=>{
  navigate(`/detail/${cameraId}`)
}

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container >
    
       
          <div style={{ maxWidth: '100%' }}>

          <MaterialTable
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Mac Adresse', field: 'ethMacAddress' },
              { title: 'ZoneID', field: 'zoneId'  },
             ]}
             actions={[
              {
                icon: VisibilityIcon,
                tooltip: "View Detail",
                onClick: (event, rowData) => handleClick(rowData.cameraId),
              },
              
            
            ]}
            options={{
              actionsColumnIndex: -1
            }}
            data={tableData} 
            title="Camera List"
          />
        </div>
        
      
     
    </Container>
  );
};

export default Home;
