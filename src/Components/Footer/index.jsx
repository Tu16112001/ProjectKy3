import React from "react";
import { Imgcomponent } from './style'
import { MailOutlined, PhoneOutlined, EnvironmentOutlined,GooglePlusOutlined,TwitterOutlined,InstagramOutlined, YoutubeOutlined,FacebookOutlined,YahooOutlined} from '@ant-design/icons'
export const Footer = () => {
    return (
        <div>
            <Imgcomponent>
                <div style={{padding: "90px", display: "flex", color: "white",
                 alignItems: "center", background: "black", opacity: "0.7",justifyContent:"space-between" }}>
                    <div style={{ padding:"10px" }}>
                        <h3>About the store</h3>

                        <p style={{padding:"20px 0 15px 0"}}>Royal Jewelry - Specializing in providing<br/> high-end luxury jewelry nationwide</p>
                        <p><MailOutlined /></p>
                        <p><PhoneOutlined /></p>
                        <p><EnvironmentOutlined /></p>
                    </div>
                    <div style={{ padding:"10px" }}>
                        <h3>About </h3>

                        <p> Thông tin
                            </p>
                        <p> Trang chủ</p>
                        <p> Sản phẩm</p>
                        <p> Tin tức</p>
                        <p> Liên hệ</p>
                        <p> Giới thiệu</p>
                        
                    </div>
                    <div style={{ padding:"10px" }}>
                    <h3>About </h3>

<p> Thông tin
    </p>
<p> Trang chủ</p>
<p> Sản phẩm</p>
<p> Tin tức</p>
<p> Liên hệ</p>
<p> Giới thiệu</p>
                    </div>
                    <div style={{ padding:"10px" }}>
                        <h3>About the store</h3>

                        <p>
Sign up to receive emails to receive the latest promotional information</p>
                        <div>
                        <input></input>
                        <GooglePlusOutlined />
                        </div>
                        <p>Or follow via:</p>
                        <p>
                            <TwitterOutlined />
                            <InstagramOutlined />
                            <FacebookOutlined />
                            <YahooOutlined />
                            <YoutubeOutlined />
                        </p>
                    </div>
                </div>

            </Imgcomponent>
        </div>
    )
}