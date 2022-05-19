// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert';
// // import './Theater.css';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import Navbar from '../../components/dashboard/Navbar';
// import Sidebar from '../../components/dashboard/Sidebar';

// const DisplayAll = () => {

//     const [session, setSession] = useState([]);
//     const [count, setCount] = useState([]);
//     const [wordEntered, setWordEntered] = useState("");

//     // Fetch All Sessions
//     const fetchSession = () => {
//         axios.get("http://localhost:8081/session/")
//             .then(response => {
//                 console.log(response)
//                 setSession(response.data)
//                 setCount(response.data.length);
//             })
//             .catch(error => {
//                 console.log(error);
//                 // alert("Error Fetching Staff Members")
//             });

//             const deleteSession = (sessionID) => {
//                 Swal({
//                     title: "Are you sure?",
//                     text: "Once deleted, you will not be able to recover this Session!",
//                     icon: "warning",
//                     buttons: true,
//                     dangerMode: true,
//                 })
//                     .then((willDelete) => {
//                         if (willDelete) {
//                             axios
//                                 .delete(`http://localhost:8081/session/${sessionID}`)
//                                 .then(response => {
//                                     // alert(response.data.message);
//                                     Swal("The Session is Deleted!", {
//                                         icon: "success",
//                                     });
//                                     fetchTheater();
//                                 })
//                                 .catch(error => Swal('Error deleting Session'));
        
//                         } else {
//                             Swal("Session didn't deleted!");
//                         }
//                     });
//             }

//     }

// }