import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './App.css';
import { Input, Button, Modal}  from 'antd';


function ScreenHome(props) {

    // Sign-Up Data
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    // Sign-In Data
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [userExiste, setUserExiste] = useState(false);

    // set erreurModal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("Error");
    const [modalDescription, setModalDescription] = useState("");

    const showModal = () => {
      setIsModalVisible(true);
      setModalTitle(modalTitle);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    //Sign up
    let handleSubmitSignUp = async () => {
        const data = await fetch("/users/sign-up", {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: `signUpUsername=${signUpUsername}&signUpEmail=${signUpEmail}&signUpPassword=${signUpPassword}`,
        });

        const json = await data.json();
        const userData = json
        console.log(userData)

        if (userData.result === true) {
            console.log("Enregistrement OK")
            setModalDescription("Enregistrement OK");
            showModal()
        } else {
            console.log(userData.error);
            setModalDescription(userData.error.join(", "))
            showModal()
        }
    }
    
    //Sign in
    let handleSubmitSignIn = async () => {
        const data = await fetch("/users/sign-in", {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: `signInEmail=${signInEmail}&signInPassword=${signInPassword}`,
        });

        const json = await data.json();
        const userData = json
        console.log(userData)
        if (userData.result === true) {
            console.log("Connexion Réussie")
            // console.log(userData)
            setUserExiste(true);
            props.signIn(userData.userId) 
            // console.log(userData.userId)
        } else {
            console.log(userData.error);
            setModalDescription(userData.error.join(", "))
            showModal()
        }
    }

    if (userExiste) {
        return (<Redirect to='/ScreenSource' />);
    }



  return (

    <div className="Login-page" >

        {/* SIGN-IN */}

        <div className="Sign">        
                <Input className="Login-input" placeholder="arthur@gmail.com" 
                    onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail}/>

                <Input.Password className="Login-input" placeholder="password" 
                    onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}/>

                <Button style={{width:'80px'}} type="primary"
                    onClick={() => handleSubmitSignIn(signInEmail, signInPassword)}>Sign-in</Button>
        </div>

        {/* SIGN-UP */}

        <div className="Sign">        

                <Input className="Login-input" placeholder="Arthur G" 
                    onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername}/>

                <Input className="Login-input" placeholder="e-mail" 
                    onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail}/>

                <Input.Password className="Login-input" placeholder="password"      
                    onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}/>

                <Button style={{width:'80px'}} type="primary"
                    onClick={() => handleSubmitSignUp(signUpUsername, signUpEmail, signUpPassword)}>Sign-up</Button>
        </div>

        <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>{modalDescription}</p>
        </Modal>

    </div>
  );
}

    function mapDispatchToProps (dispatch) {
        return {
            signIn : (user) => dispatch({ type: 'USER_SIGN_IN', user}),
        };
    }

export default connect(null, mapDispatchToProps)(ScreenHome);
