import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Breadcrumbs from './modules/Breadcrumbs';
import { yellow } from '@material-ui/core/colors';
import { TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

export default function ContactPage() {

    const bdcrumbs = {
        home: {link : "/", text: "home"},
        current: {text: "Contact"}
    }

    return (
        <div className="product-page">
            <div className="head-page">
                <img src="/images/header-contact.jpg" alt="Contact" />
                <Breadcrumbs bdcrumbs={bdcrumbs} />
            </div>

            <div className="contact-page-container">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3852.3540486006277!2d10.68380454882217!3d35.71562447281565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76df48c34afce417!2sDNL%20Deco%20Numerique%20et%20Laser!5e0!3m2!1sen!2stn!4v1625511027382!5m2!1sen!2stn" 
                width="100%" 
                height="400" 
                loading="lazy"
                title="dnlmap">    
                </iframe>
                <div className="contact-bloc-container">
                    <div className="contact-infos">
                        <div className="contact-info">
                            <LocationOnIcon style={{ color: yellow[800], fontSize: '4rem' }} />
                            <h4>Where are you ?</h4>
                            <address>Ouardanin, Monastir, Tunisia</address>
                        </div>
                        <div className="contact-info">
                            <PhoneInTalkIcon style={{ color: yellow[800], fontSize: '4rem' }} />
                            <h4>Call us</h4>
                            <a href="tel:+21654737005">+216  54 737 005</a>
                        </div>
                        <div className="contact-info">
                            <AccessTimeIcon style={{ color: yellow[800], fontSize: '4rem' }} />
                            <h4>Working hours</h4>
                            <p>Mon - Sat : 09:00 - 18:00</p>
                        </div>
                    </div>
                    <div className="send-email-bloc">
                        <h2>Send an email</h2>
                        <p>
                            Thanks for your interest in DNL DECO Numérique et lazer. We believe in creativity as one of the major forces of progress. Please use this form if you have any questions about our products and we'll get back with you very soon.       
                        </p>
                    </div>
                    <form>
                        <TextField className="myinput" id="name" label="Your Name" />
                        <TextField className="myinput"  id="phone" label="Your Phone" type="tel" />
                        <TextField className="myinput" 
                            id="message"
                            label="Your message"
                            multiline
                            rows={4}
                            defaultValue="Ask us a question"
                            variant="outlined"
                        />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            className="mybtn-send"
                            endIcon={<Icon>send</Icon>}
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </div>
            

        </div>
    )
}
