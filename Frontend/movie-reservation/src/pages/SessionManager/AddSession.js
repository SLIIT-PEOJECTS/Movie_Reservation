import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from 'react-select';
import Navbar from '../../components/dashboard/Navbar';
import Sidebar from '../../components/dashboard/Sidebar';
import firebase from './firebase';
import 'firebase/storage'

const AddSession = () => {

    //const [file, setFile] = useState(null);
    //const [movieURL, setURL] = useState("");
    //const [cast, setSelectedCast] = useState("");
    //const [tags, setSelectedTag] = useState("");

    const [state, setState] = useState({
        sessionName: "",
        fromTime: "",
        toTime: "",
    });

}