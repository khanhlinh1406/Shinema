import React from "react";
import { useState } from "react";

import './footer.css'

import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs'

const Footer = () => {
    const defaultColor = '#fff'
    return (
        <div className="footer-container">
            <div className="footer-container__introduce">
                <img src={Logo} alt="Shinema" className="footer-container__introduce__logo" />
                <div className="footer-container__introduce__name">Shinema</div>
                <div className="clear"></div>
                <div className="footer-container__introduce__content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt, accusantium, cumque obcaecati similique et ducimus inventore fugiat velit exercitationem dolorem iusto porro repellat accusamus quia eum, quos eveniet expedita!
                </div>
                <p className="footer-container__introduce__more"><Link to=''>More about us</Link></p>
            </div>

            <div className="footer-container__categories">
                <div className="title">CATEGORIES</div>
                <p className="footer-container__categories__item"><Link to='/'>Home Page</Link></p>
                <p className="footer-container__categories__item"><Link to=''>Services</Link></p>
                <div className="footer-container__categories__item"><Link to=''>Privacy</Link></div>
            </div>

            <div className="footer-container__contact">
                <div className="title">CONTACT</div>
                <div className="contact-item">
                    <FaTelegramPlane className="contact-item__icon" size={18} color={defaultColor} />
                    <div className="contact-item__content">University of Information Technology, HCMC</div>
                </div>

                <div className="contact-item">
                    <AiOutlineMail className="contact-item__icon" size={18} color={defaultColor} />
                    <div className="contact-item__content">shinemaapplication@gmail.com</div>
                </div>

                <div className="contact-item">
                    <BsTelephoneFill className="contact-item__icon" size={18} color={defaultColor} />
                    <div className="contact-item__content">038.3303.061</div>
                </div>
            </div>

        </div>
    )
}

export default Footer