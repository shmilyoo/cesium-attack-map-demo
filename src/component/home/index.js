import React from "react";
import { Row, Col } from "antd";
import Thumb from "./thumb";
import main_gif from "../../assets/images/main.gif";
import main_img from "../../assets/images/main.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";
import img5 from "../../assets/images/5.png";
import img6 from "../../assets/images/6.png";
import img7 from "../../assets/images/7.png";
import img8 from "../../assets/images/8.png";
import img9 from "../../assets/images/9.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div class="title">网络安全态势可视化系统</div>
        <div id="main">
          <div>
            <Row>
              <div>
                <Col span={2} />
                <Col span={5}>
                  <Row>
                    <Thumb link="/world" first_img={img7} second_img={img7} />
                  </Row>
                  <Row>
                    <Thumb link="/world" first_img={img3} second_img={img3} />
                  </Row>
                </Col>
                <Col span={10}>
                  <Thumb
                    link="/world"
                    first_img={main_img}
                    second_img={main_gif}
                  />
                </Col>
                <Col span={5}>
                  <Row>
                    <Thumb link="/world" first_img={img4} second_img={img4} />
                  </Row>
                  <Row>
                    <Thumb link="/world" first_img={img8} second_img={img8} />
                  </Row>
                </Col>
                <Col span={2} />
              </div>
            </Row>
          </div>

          <div>
            <Row>
              <Col span={2} />
              <Col span={5}>
                <Thumb link="/world" first_img={img4} second_img={img4} />
              </Col>
              <Col span={5}>
                <Thumb link="/world" first_img={img5} second_img={img5} />
              </Col>
              <Col span={5}>
                <Thumb link="/world" first_img={img6} second_img={img6} />
              </Col>
              <Col span={5}>
                <Thumb link="/world" first_img={img7} second_img={img7} />
              </Col>
              <Col span={2} />
            </Row>
          </div>
        </div>
        <div id="foot" />
      </div>
    );
  }
}

export default Home;
