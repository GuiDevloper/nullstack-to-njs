import Nullstack from 'nullstack';

type props = {
  /**
   * Prop defined by use
   */
  myProp: {
    /**
     * my subProp
     */
    subProp: string
  }
};

type myCtx = Context & props;

interface mineCtx extends Context {
  myProp: {
    /**
     * subProp
     */
    subProp: props['myProp']['subProp']
  }
}

const gato1: string = '';
const gato2: number = 10;
const gato3: Array<number> = [1, 2];
const gato4: number[] = [1, 2];
const gato5: boolean[] = [true, false];
let gato6:object = {
  gato: ''
}

class App extends Nullstack {
  constructor(_: props) {
    super();
  }

  gato: string = '';
  gatin = '';
  async initiate({ router }: myCtx) {
    router.base.length.toString();
    this.gato = router.base;
    router.url;
  }
  
  render(ctx: mineCtx) {
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
