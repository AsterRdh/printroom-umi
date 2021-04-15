import React from 'react';
import myName from '../img/myName.png';


class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props.location);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', backgroundColor: '#151515',paddingBottom:50 }}>
        <img src={myName} />
        <div>
          GitHub:
          <a href={'https://github.com/AsterRdh'}>
            https://github.com/AsterRdh
          </a>
          <br />
          bilibili:
          <a href={'https://space.bilibili.com/24029993'}>
            https://space.bilibili.com/24029993
          </a>
        </div>
      </div>
    );
  }
}


export default Welcome;
