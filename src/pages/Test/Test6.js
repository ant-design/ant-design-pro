import React, {Component} from 'react';

export default class Test6 extends Component {


  onRef = (ref) => {
    this.child = ref
  }

  click = (e) => {
    this.child.myName()
  }

  render() {
    return(
      <div>
        <Child onRef={this.onRef} />
        <button onClick={this.click} >click</button>
      </div>
    )
  }

}

class Child extends Component {
  componentDidMount(){
    const {onRef} = this.props;
    onRef(this);
  }

  myName = () => alert('xiaohesong')

  render() {
    return ('woqu')
  }
}
