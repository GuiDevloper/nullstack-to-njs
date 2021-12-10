/// <reference types="nullstack-types"/>
import Nullstack from 'nullstack';
import App from './App';

class App2 extends Nullstack {

  isTrue: boolean = false;
  async initiate() {
    // your code goes here
  }
  
  render() {
    return (
      <div>
        <App myProp={{subProp: '' + this.isTrue}} />
      </div>
    )
  }

}

export default App2;