import React from "react";
import { Imgcomponent } from './style'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, GooglePlusOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, FacebookOutlined, YahooOutlined } from '@ant-design/icons'
export const Footer = () => {
    return (
        <div>
            <Imgcomponent>
                <div style={{
                    padding: "90px", display: "flex", color: "white",
                    alignItems: "center", background: "black", opacity: "0.8", justifyContent: "space-between"
                }}>
                    <div style={{ padding: "10px" }}>
                        <h3>About the store</h3>

                        <p style={{ padding: "20px 0 15px 0" }}>Royal Jewelry - Specializing in providing<br /> high-end luxury jewelry nationwide</p>
                        <p><MailOutlined />  : quangtu161101@gmail.com</p>
                        <p><PhoneOutlined /> : 0328063556</p>
                        <p><EnvironmentOutlined /> : 79 NgocHoi-HoangMai-HaNoi</p>
                    </div>
                    <div style={{ padding: "10px" }}>
                        <h3>About </h3>

                        <p> Information
                        </p>
                        <p> Home page</p>
                        <p> Product</p>
                        <p> News</p>
                        <p> Contact</p>
                        <p> Introduce
                        </p>

                    </div>
                    <div style={{ padding: "10px" }}>
                        <h3>Link </h3>

                        <p> Information
                        </p>
                        <p> Home page</p>
                        <p> Product</p>
                        <p> News</p>
                        <p> Contact</p>
                        <p> Introduce
                        </p>
                    </div>
                    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                        <h3>About the store</h3>

                        <p style={{ marginTop: "10px", width: "300px" }}>
                            Sign up to receive emails to receive the latest promotional information</p>
                        <div style={{ float: "left", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>
                            <input style={{ width: "300px", height: "39px", border: "none", outline: "none", fontSize: "14px" }}></input>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}><GooglePlusOutlined /></button>
                        </div>
                        <p style={{ marginTop: "10px" }}>Or follow via:</p>
                        <div style={{ width: "250px", display: "flex", justifyContent: "space-between" }}>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}> <TwitterOutlined /></button>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}><InstagramOutlined /></button>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}><FacebookOutlined /></button>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}><YahooOutlined /></button>
                            <button style={{ width: "40px", height: "40px", border: "none", color: "white", fontSize: "20px", background: "blue" }}><YoutubeOutlined /></button>
                        </div>
                    </div>
                </div>

            </Imgcomponent>
        </div>
    )
}