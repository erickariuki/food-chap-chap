import React from 'react';
// import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import '../components/css/ContactUs.css'
import Swal from 'sweetalert2';


const SERVICE_ID = "service_6mnqy2n";
const TEMPLATE_ID = "template_0h25g8u";
const PUBLIC_KEY = "E1ZeG4ClRU_5Ud6PG";


function ContactMe() {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  };



  return (
    <div className="contact-div">
      <div >
      <h1 className="text">Let's get in touch</h1>
      <form onSubmit={handleOnSubmit} className="form-container" >
          <input type="text" name="name" placeholder="Name" className="form-input" />
         
          <input type="email" name="email"  placeholder="Email" className="form-input" />
          
          
          <textarea  name="message" placeholder="Message" className="form-textarea" />
         

         <button  className="submit" value="send"> Submit</button> 
         </form>
      </div>
            
    </div>
  );
}

export default ContactMe;



