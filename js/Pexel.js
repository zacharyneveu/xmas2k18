import React from "react";
import Axios from "axios";
import Weather from "./Weather";
import { styles } from "./styles";
import { ColorExtractor } from "react-color-extractor";

export default class Pexel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      imgURL: "",
      baseURL: "https://api.pexels.com/v1/search?per_page=15&page=1",
      accessKey: "563492ad6f917000010000017b2c05b8938249d58b9805ab4b498f29"
    };
    this.getImg = this.getImg.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  getColor(colors) {
    console.log(colors);
    let col = colors[Math.floor(Math.random() * colors.length)];
    this.props.onNew(colors[0]);
  }

  componentWillReceiveProps(newProps) {
    let newdesc = newProps.description.replace(" ", "+");
    if (newdesc != this.state.desc) {
      this.setState({ desc: newdesc });
      this.getImg(newdesc);
      console.log("getting image for: " + newProps.description);
    }
  }

  getImg(desc) {
    Axios.get(this.state.baseURL + "&query=" + desc, {
      headers: {
        Authorization: this.state.accessKey
      }
    })
      .then(response => {
        let imgs = response.data.photos;
        console.log(imgs);
        let img = imgs[Math.floor(Math.random() * imgs.length)];
        let img_url = img.src.large;
        this.setState({ img: img_url });
        this.props.onNew(img.color);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <ColorExtractor
          getColors={colors => this.getColor(colors)}
          src={this.state.img}
        />
        <div
          style={Object.assign({}, styles.img, {
            backgroundImage: `url(${this.state.img})`
          })}
        >
          <center>{this.props.children}</center>
        </div>
      </div>
    );
  }
}
