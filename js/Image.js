import React from "react";
import Axios from "axios";
import Weather from "./Weather";
import { styles } from "./styles";

export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      imgURL: "",
      baseURL: "https://api.unsplash.com/search/photos?page=1",
      accessKey:
        "14c277423e61a4bd47dec1d6ea910c2b7442f4b56da0038c62977488e084203d",
      orientation: "squarish"
    };
    this.getImg = this.getImg.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.description != this.state.desc) {
      this.setState({desc: newProps.description});
      this.getImg(newProps.description);
      console.log("getting image for: "+newProps.description);
    }
  }

  getImg(desc) {
    Axios.get(
      this.state.baseURL +
      "&query=" +
      desc +
      "&client_id=" +
      this.state.accessKey +
      "&orientation=" +
      this.state.orientation
    )
      .then(response => {
        let imgs = response.data.results;
        let img = imgs[Math.floor(Math.random() * imgs.length)];
        let img_url = img.urls.regular;
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
        <div
          style={Object.assign({}, styles.img, {
            backgroundImage: `url(${this.state.img})`
          })}
        >
        <center>
          {this.props.children}
        </center>
        </div>
      </div>
    );
  }
}
