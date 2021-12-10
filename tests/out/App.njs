import Nullstack from 'nullstack';

const gato1 = '';
const gato2 = 10;
const gato3 = [1, 2];
const gato4 = [1, 2];
const gato5 = [true, false];
let gato6 = {
  gato: ''
}

class App extends Nullstack {
  constructor(_) {
    super();
  }

  gato = '';
  gatin = '';
  async initiate({ router }) {
    router.base.length.toString();
    this.gato = router.base;
    router.url;
  }
  
  render(ctx) {
    ctx.myProp.subProp;
    ctx.myProp;
    return (
      <>
        <div> { ctx.myProp } </div>
        <div> { ctx.myProp.subProp } </div>
      </>
    )
  }

}

export default App;
