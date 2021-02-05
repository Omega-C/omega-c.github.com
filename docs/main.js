//short little react hello world
class Map extends React.Component {
  defaults(property,def) {
    return((property in this.props)?this.props[property]:def);
  }
  render() {
    return(<iframe style={{width:this.defaults("width",500),height:this.defaults("height",500),border:0}} frameBorder={0} src={`https://www.google.com/maps/embed/v1/${this.defaults("type","search")}?q=${this.defaults("location",this.props.children)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}/>);
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state={place:"Red Lobster"};//its an inside joke
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.dealWithPos.bind(this),(p)=>{},{enableHighAccuracy:true});
    }
    else {
      alert("results will not pertain :,(");
      this.state.pos="";
    }
  }
  dealWithPos(position) {
    this.state.position=`${position.coords.latitude}, ${position.coords.longitude}`
  }
  render() {
    return (<Map {...this.props}>{`${this.state.place}{this.state.pos}`}</Map>);
  }
}

ReactDOM.render(<Application height={600}/>,document.getElementById("app"));
