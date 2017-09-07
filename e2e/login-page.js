import ReactSelector from 'testcafe-react-selectors';

export default class LoginPage {
  constructor() {
    this.userInput = ReactSelector('Input');
  }
}
