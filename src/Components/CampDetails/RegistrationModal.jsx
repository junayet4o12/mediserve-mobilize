/* eslint-disable react/prop-types */
import { Box, Button, Modal } from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../firebase/authProvider/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// import React from 'react';

const RegistrationModal = ({ camp, id, handleClose, open }) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const [openchild, setopenchild] = useState(false)
    const [writtenname, setwrittenName] = useState('')
    const [writtenage, setwrittenage] = useState('')
    const [writtencontactnum, setwrittencontactnum] = useState('')
    const [writtenemergencynum, setwrittenemergencynum] = useState('')
    const [selectedGender, setSelectedGender] = useState('');
    const [devision, setdevision] = useState('')
    const [districts, setdistricts] = useState([])
    const [selecteddistricts, setselecteddistricts] = useState('')
    const [selectedFever, setfever] = useState('')
    const [selectedHeadeche, setheadeche] = useState('')
    const [selectedWeak, setweak] = useState('')
    const [error, seterror] = useState('')
    const [registerInformation, setregisterInformation] = useState({})
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,

    };
    const dhaka = ["dhaka", "faridpur", "gazipur", "gopalganj", "kishoreganj", "madaripur", "manikganj", "narayanganj", "narsingdi", "rajbari", "shariatpur", "tangail"];

    const chattogram = ["chattagram", "cox's bazar", "rangamati", "bandarban", "khagrachhari", "feni", "lakshmipur", "comilla", "noakhali", "brahmanbaria", "chandpur"];

    const rajshahi = ["rajshahi", "chapainawabganj", "natore", "naogaon", "pabna", "sirajganj", "bogra", "joypurhat"];

    const sylhet = ["sylhet", "sunamganj", "moulvibazar", "habiganj"];

    const mymensingh = ["tangail", "jamalpur", "kishoreganj", "sherpur", "netrokona", "mymensingh"];

    const barishal = ["barishal", "patuakhali", "bhola", "pirojpur", "barguna", "jhalokati"];

    const rangpur = ["rangpur", "gaibandha", "nilphamari", "kurigram", "lalmonirhat", "dinajpur", "thakurgaon", "panchagarh"];

    const khulna = ["khulna", "bagerhat", "satkhira", "jessore", "magura", "jhenaidah", "narail", "kushtia", "chuadanga", "meherpur"];
    const handlename = e => {
        setwrittenName(e.target.value)
    }
    const handleage = e => {
        setwrittenage(e.target.value)
    }
    const handlecontactnum = e => {
        setwrittencontactnum(e.target.value)
    }
    const handleemergencynum = e => {
        setwrittenemergencynum(e.target.value)
    }
    const handledevision = (e) => {
        e.preventDefault()
        const value = e.target.value
        setdevision(e.target.value)
        if (value == 'dhaka') {
            setdistricts(dhaka)
        }
        if (value == 'chattogram') {
            setdistricts(chattogram)
        }
        if (value == 'barishal') {
            setdistricts(barishal)
        }
        if (value == 'rangpur') {
            setdistricts(rangpur)
        }
        if (value == 'khulna') {
            setdistricts(khulna)
        }
        if (value == 'rajshahi') {
            setdistricts(rajshahi)
        }
        if (value == 'mymensingh') {
            setdistricts(mymensingh)
        }
        if (value == 'sylhet') {
            setdistricts(sylhet)
        }
    }
    const handledistrict = e => {
        setselecteddistricts(e.target.value)
    }
    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };
    const handleFeverChange = (fever) => {
        setfever(fever)
    }
    const handleHeadecheChange = (headeche) => {
        setheadeche(headeche)
    }
    const handleWeakChange = (weak) => {
        setweak(weak)
    }

    const handleSubmit = (e) => {
        if (!user) {
            return Swal.fire({
                title: 'Error!',
                text: 'Please Log in First',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        e.preventDefault()
        seterror('')
        const form = e.target;
        const gender = selectedGender;
        const fever = selectedFever;
        const headeche = selectedHeadeche;
        const weak = selectedWeak;
        if (!gender || !fever || !headeche || !weak) {
            return seterror(`Please Selecet ${!gender ? 'gender' : ''} ${!fever ? 'fever' : ''} ${!headeche ? 'headeche' : ''} ${!weak ? 'weak' : ''}`)
        }
        const registerName = form.name.value;
        const age = form.age.value;
        const number = form.number.value;
        if (number.length !== 11) {
            return seterror('Your Contact Number Must be 11 charecters')
        }
        const devision = form.devision.value;
        const district = form.district.value;
        const emergencyNumber = form.emergencynumber.value;
        if (emergencyNumber.length !== 11) {
            return seterror('Your Emergency  Contact Number Must be 11 charecters')
        }
        const Information = {
            registerName,
            age,
            contactInformation: {
                number,
                emergencyNumber,
            },
            gender,
            address: {
                devision,
                district,
            },

            healthInformation: {
                fever,
                headeche,
                weak
            },
            campInfo: {
                campId: id,
                campName: camp?.campName,
                campFee: camp?.campFees,
                campSpecializedService: camp?.specializedService,
                campHealthcareExpert: camp?.healthcareExpert,
                campTargetAudience: camp?.targetAudience,
                campvenueLocation: camp?.venueLocation,
                campImage: camp?.image,
                organizerEmail: camp?.organizerEmail,
                DateAndTime: camp?.DateAndTime
            },
            registerEmail: user?.email,
            userName: user?.displayName,
            



        }
        setregisterInformation(Information)
        setopenchild(true)

    }
    const handleConfirm = () => {
        setopenchild(false)
        axiosSecure.post('/registrationcamps', registerInformation)

            .then(res => {
                console.log(res.data);
                if (res?.data?.insertedId) {
                    axiosSecure.put(`/camps/${id}`)
                    .then(res=> {
                        console.log(res?.data);
                        if(res?.data?.modifiedCount>0){
                            handleClose()
                            setSelectedGender('')
                            setfever('')
                            setheadeche('')
                            setweak('')
                            setdevision('')
                            setdistricts([])
                            setselecteddistricts('')
                            setwrittenName('')
                            setwrittenage('')
                            setwrittencontactnum('')
                            setwrittenemergencynum('')
        
                            Swal.fire({
                                icon: "success",
                                title: "Successfully Registered !!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                   
                }
            })
            .catch(err => console.log(err))



    }
    return (
        <div >
            <Modal
                sx={{ display: 'flex' }}
                keepMounted
                open={open}
                // onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                {/* Collect necessary info like participant details(Name, Age,
                Phone,Gender, Address), Camp Fees(Fee Amount readonly), and
                  requirements(Any specific health-related information,Emergency
                 c ontact). */}


                <div className="bg-blue-50  mx-auto my-auto p-5 overflow-hidden  max-h-[90vh] overflow-y-scroll max-w-[700px]">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-center py-2">Registration Form</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5 ">
                            <div className="  ">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input onChange={handlename} value={writtenname} required name="name" type="text" placeholder="Name" className="input input-bordered w-full sm:w-[320px]" />

                            </div>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Your Age</span>
                                </label>
                                <input onChange={handleage} value={writtenage} required name="age" type="number" placeholder="Age" className="input input-bordered w-full sm:w-[320px]" />

                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className="form-control  w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Your Contact Number</span>
                                </label>
                                <input onChange={handlecontactnum} value={writtencontactnum} required name="number" type="number" placeholder="Number" className="input input-bordered w-full sm:w-[320px]" />

                            </div>
                            <div className=" w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Your Gender: <span className="font-bold">{selectedGender}</span></span>
                                </label>
                                <div className="flex gap-5">
                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={selectedGender === 'male'}
                                            onChange={() => handleGenderChange('male')}
                                        />
                                        Male
                                    </label>

                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={selectedGender === 'female'}
                                            onChange={() => handleGenderChange('female')}
                                        />
                                        Female
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className=" ">
                                <div className="form-control w-full sm:w-[320px]">
                                    <label className="label">
                                        <span className="label-text">Pick your Devision</span>

                                    </label>
                                    <select value={devision} required name="devision" onChange={handledevision} className="select select-bordered">
                                        <option value={''} disabled selected>Pick Devision</option>
                                        <option value='dhaka'>Dhaka</option>
                                        <option value='chattogram'>Chattogram</option>
                                        <option value='barishal'>Barishal</option>
                                        <option value='rangpur'>Rangpur</option>
                                        <option value='khulna'>Khulna</option>
                                        <option value='rajshahi'>Rajshahi</option>
                                        <option value='mymensingh'>Mymensingh</option>
                                        <option value='sylhet'>Sylhet</option>

                                    </select>

                                </div>

                            </div>
                            <div className="form-control  ">

                                <div className="form-control w-full sm:w-[320px]">
                                    <label className="label">
                                        <span className="label-text">Pick your District</span>

                                    </label>
                                    <select value={selecteddistricts} onChange={handledistrict} required name="district" disabled={!devision} className="select select-bordered">
                                        <option value={''} disabled selected>Pick District</option>
                                        {
                                            districts.map((district, idx) => <option key={idx} value={district}>{district.charAt(0).toUpperCase() + district.slice(1)}</option>)
                                        }



                                    </select>

                                </div>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className="form-control  w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Camp Fee</span>
                                </label>
                                <div className="input input-bordered w-full max-w-xs font-bold text-black flex justify-start items-center " >${camp?.campFees}</div>

                            </div>
                            <div className=" w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Do you have fever?- <span className="font-bold">{selectedFever}</span></span>
                                </label>
                                <div className="flex gap-5">
                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="fever"
                                            value="yes"
                                            checked={selectedFever === 'yes'}
                                            onChange={() => handleFeverChange('yes')}
                                        />
                                        yes
                                    </label>

                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="fever"
                                            value="no"
                                            checked={selectedFever === 'no'}
                                            onChange={() => handleFeverChange('no')}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-x-5">
                            <div className=" w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Do you have headeche?- <span className="font-bold">{selectedHeadeche}</span></span>
                                </label>
                                <div className="flex gap-5">
                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="headeche"
                                            value="yes"
                                            checked={selectedHeadeche === 'yes'}
                                            onChange={() => handleHeadecheChange('yes')}
                                        />
                                        yes
                                    </label>

                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="headeche"
                                            value="no"
                                            checked={selectedHeadeche === 'no'}
                                            onChange={() => handleHeadecheChange('no')}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                            <div className=" w-full sm:w-[320px]">
                                <label className="label">
                                    <span className="label-text">Are you feeling weak?- <span className="font-bold">{selectedWeak}</span></span>
                                </label>
                                <div className="flex gap-5">
                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="weak"
                                            value="yes"
                                            checked={selectedWeak === 'yes'}
                                            onChange={() => handleWeakChange('yes')}
                                        />
                                        yes
                                    </label>

                                    <label className="text-base font-bold flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="weak"
                                            value="no"
                                            checked={selectedWeak === 'no'}
                                            onChange={() => handleWeakChange('no')}
                                        />
                                        No
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="form-control   w-full sm:w-[320px]">
                            <label className="label">
                                <span className="label-text">Emergency Contact Number</span>
                            </label>
                            <input onChange={handleemergencynum} value={writtenemergencynum} required name="emergencynumber" type="number" placeholder="Number" className="input input-bordered w-full sm:w-[320px]" />

                        </div>
                        <p className="text-sm font-medium text-red-500">
                            {error}
                        </p>
                        <div className="flex gap-7 flex-wrap pt-5">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <p className="btn btn-neutral" onClick={handleClose}>close</p>
                        </div>
                    </form>
                </div>


            </Modal>
            <Modal
                open={openchild}

                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <div className="p-2 w-[250px] sm:w-[300px] ">
                        <h2 className="text-2xl font-bold mb-2" id="child-modal-title">Are You sure?</h2>
                        <p className="text-base font-medium mb-4" id="child-modal-description">
                            You can check your infromation twice
                        </p>
                        <Button className="login" sx={{ background: 'blue', color: 'white', mr: '10px', p: '10px', fontWeight: 'bold', mb: '10px', '&:hover': { background: '#003366' }, }} onClick={handleConfirm}>Confirm !!</Button>
                        <Button className="login" onClick={() => setopenchild(false)} sx={{ background: 'red', color: 'white', mr: '10px', p: '10px', fontWeight: 'bold', mb: '10px', '&:hover': { background: '#E53E3E' }, }} >Check info</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default RegistrationModal;